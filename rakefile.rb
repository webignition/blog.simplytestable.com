require 'yaml'
require 'fileutils'
require '/var/lib/gems/1.8/gems/grit-2.5.0/lib/grit'

VENDOR_DIRECTORY = "vendor"
VENDOR_MANIFEST = "manifest.yml"

task :default do  
  puts 'Building ...'
  fetch_vendors
  system("jekyll")
end

task :rebuild do
  remove_vendors
  fetch_vendors
  system("jekyll")
end

def remove_vendors
  puts "Removing vendors ..."
  
  config = YAML.load_file("manifest.yml")
  
  config['vendors'].each do |vendor|
    vendor.each { |key,value|
      puts "Removing " + key + " ..."

      vendor_directory = VENDOR_DIRECTORY + '/' + key
      if File.directory?(vendor_directory)
        FileUtils.rm_rf vendor_directory        
      end     
    }
  end  
end

def fetch_vendors
  puts 'Updating vendors ...'
  
  if !File.directory?(VENDOR_DIRECTORY)
    Dir::mkdir(VENDOR_DIRECTORY);
  end
  
  config = YAML.load_file("manifest.yml")
  
  config['vendors'].each do |vendor|
    vendor.each { |vendor_name,vendor_url|
      puts "Fetching " + vendor_name + " ..."

      vendor_directory = VENDOR_DIRECTORY + '/' + vendor_name
      if !File.directory?(vendor_directory)
        Dir::mkdir(vendor_directory)
        
        system("cd " + vendor_directory + " && wget " + vendor_url)
        
        if vendor_is_archive(vendor_url)
          system("cd " + vendor_directory + " && unzip -q " + get_filename_from_url(vendor_url))
          system("cd " + vendor_directory + " && rm -Rf " + get_filename_from_url(vendor_url))
        end
        
        if vendor_is_github_master(vendor_url)
          system("cd " + vendor_directory + " && mv *-* latest ")
        end
      end
    }
  end
end

def get_filename_from_url(url)
  url.split("/").last
end

def get_extension_from_filename_from_url(url)
  url.split(".").last
end

def vendor_is_github_master(url)
  return get_filename_from_url(url) == "master"
end

def vendor_is_archive(url)  
  if get_extension_from_filename_from_url(url) == "zip"
    return true
  end
  
  return vendor_is_github_master(url)
end