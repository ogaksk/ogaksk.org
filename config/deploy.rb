set :application, "ogakskorg"
set :repository, "git@github.com:ogaksk/ogaksk.org.git"
# set :repository,  "#{Dir::pwd}/.git"
# set :local_repository, "#{Dir::pwd}/.git"

set :branch, "master"
role :web, "153.121.73.90"                          # Your HTTP server, Apache/etc
role :app, "153.121.73.90"                          # This may be the same as your `Web` server

set :user, 'deployer'
set :group, 'deployer'

set :use_sudo, false
set :deploy_to, "/home/#{user}/apps/#{application}"
set :scm, :git
set :scm_verbose, true
set :deploy_via, :remote_cache
set :git_shallow_clone, 1

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :node_env, 'production'

namespace :deploy do
  task :start, :roles => :app do
    run "cd #{current_path} && NODE_ENV=#{node_env} node_modules/forever/bin/forever -w start app.js --port=1337"
  end
  
  task :stop, :roles => :app do
    run "cd #{current_path} && node_modules/forever/bin/forever stop app.js"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "cd #{current_path} && NODE_ENV=#{node_env} node_modules/forever/bin/forever -w restart app.js --port=1337"
  end
  
  task :npm_install, :roles => :app, :except => { :no_release => true } do
    #puts "current_path: #{current_path}"
    run "cd #{current_path} && npm install"
  end
end


# after 'deploy:create_symlink', 'deploy:npm_install'

# after "deploy:create_symlink", :roles => :app do
#   run "ln -svf #{shared_path}/node_modules #{current_path}/node_modules"
#   run "cd #{current_path} && npm i"
# end

after "deploy:setup", :roles => :app do
  run "mkdir -p #{shared_path}/node_modules"
end
