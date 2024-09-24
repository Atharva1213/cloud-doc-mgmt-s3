Step to host website on AWS
----------------------------------------------
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