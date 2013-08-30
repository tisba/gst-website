desc "Start a Puma server"
task :server do
  exec "bundle exec shotgun --host 0.0.0.0 --server puma server.rb"
end

## -- Misc Configs -- ##

public_dir      = "public"    # compiled site directory
deploy_dir      = "_deploy"   # deploy directory (for Github pages deployment)
repo_url        = "git@github.com:tisba/gst-website.git"
deploy_branch   = "gh-pages"

##############
# Deploying  #
##############

desc "deploy public directory to github pages"
multitask :deploy do
  puts "## Deploying branch to Github Pages "
  (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  puts "\n## copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    puts "\n## Commiting: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push origin #{deploy_branch} --force"
    puts "\n## Github Pages deploy complete"
  end
end

desc "Set up _deploy folder and deploy branch for Github Pages deployment"
task :setup_github_pages do
  user = repo_url.match(/:([^\/]+)/)[1]
  branch = (repo_url.match(/\/[\w-]+.github.com/).nil?) ? 'gh-pages' : 'master'
  project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
  url = "http://#{user}.github.com"
  url += "/#{project}" unless project == ''
  rm_rf deploy_dir
  mkdir deploy_dir
  cd "#{deploy_dir}" do
    system "git init"
    system "echo 'Coming soon...' > index.html"
    system "git add ."
    system "git commit -m \"Intial commit\""
    system "git branch -m gh-pages" unless branch == 'master'
    system "git remote add origin #{repo_url}"
  end
  puts "\n---\n## Now you can deploy to #{url} with `rake deploy` ##"
end

desc "Create Iframe snippet for integrated player"
task :iframe do
  episode = ENV['EPISODE'].downcase
  iframe_snippet =  %Q{<iframe src="http://geekstammtisch.de/ksta/#{episode}.html" height="200" frameborder="0" width="450"></iframe>}
  IO.popen("pbcopy", "r+") do |clipboard|
    clipboard << iframe_snippet
  end

  puts "** Iframe for #{episode}:"
  puts ">> #{iframe_snippet}"
  puts
  puts "** Snippet has been copied to clipboard."
end

task :default => [:server]

