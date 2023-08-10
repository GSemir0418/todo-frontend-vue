function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

user=ubuntu
ip=gsemir2.tpddns.cn
project_name=todo-frontend-vue
time=$(date +'%Y%m%d-%H%M%S')
# $0 表示当前脚本
current_dir=$(dirname $0)
nginx_config_dir=$current_dir/$project_name
dist=$current_dir/dist
deploy_dir=/home/$user/deploys/frontend/$project_name/$time
nginx_html_dir=/var/www/$project_name/html
nginx_available_dir=/etc/nginx/sites-available
nginx_enabled_dir=/etc/nginx/sites-enabled

title '打包源代码'
pnpm run build
title '创建远程目录'
ssh $user@$ip "mkdir -p $deploy_dir"
title '上传 dist'
scp -r $dist/* $user@$ip:$deploy_dir
title '复制 nginx 静态文件'
ssh $user@$ip "sudo rm -rf $nginx_html_dir/*"
ssh $user@$ip "sudo cp -r $deploy_dir/* $nginx_html_dir/"
ssh $user@$ip "sudo chown -R $user:$user $nginx_html_dir"
ssh $user@$ip "sudo chmod -R 755 /var/www/$project_name"
title '上传 nginx 配置'
scp $nginx_config_dir $user@$ip:$nginx_available_dir/
title '启动配置'
ssh $user@$ip "sudo ln -s $nginx_available_dir/$project_name $nginx_enabled_dir"
title '启动 nginx 服务'
ssh $user@$ip "sudo systemctl restart nginx"
title '部署完毕'