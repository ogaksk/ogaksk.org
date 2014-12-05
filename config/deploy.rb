set :application, "ogakskorg"
set :repository, "git@github.com:ogaksk/raspi_croud.git"
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


namespace :deploy do
  task :start, :roles => :app do
  end
  
  task :stop, :roles => :app do
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
  end
end

