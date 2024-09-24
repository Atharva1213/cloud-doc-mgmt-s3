Step to host website on AWS
----------------------------------------------
Normal Hosting App :-

1. Login to  AWS console
2. create ec2 machine
3. configure security group(ssh -22 for admin only)(80 - for normal traffic)
4. connect to ec2 machine
5. install httpd webserver in machine(used to run web app)
 sudo su
 yum update -y
 yum install httpd -y
 cd /var/www/html
 create website 
 service httpd start
6. access website from browser using ec2 public ip or DNS  

Using this we can host as index.html on  ec2 with port no 80 


Custom React App Host-: 

Sudo Su 
Create The WorKspace
mkdir workSpace 
cd workSpace

install all packages like 
git
Download Nodejs to ec2 
pm2  
serve global 
clone repos
install depnecies 
serve make the build 
adding the secirut group to ec2 
then adding he http : 80 
then set the react app to 80 port
npm i -g pm2   
pm2 serve build 80 --spa 
serve -s build 
runinig on public port 80 
how to see  the log pm2 
pm2 logs
allow check the public ip address berfore starting the instance through cmd 


how to add the ssh key of my computer to github account 

step1 
getentate ssh key for my pc 
Asus/.ssh/ location that file .pub

ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub 
add to setting/ssh/key/  -- github

