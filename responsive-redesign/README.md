Redesign project
=====

This is a redesign project at:  
https://stage.wepay.com  
https://stage.wepay.com/team  
https://stage.wepay.com/platforms  
https://stage.wepay.com/about  
https://stage.wepay.com/features    
https://stage.wepay.com/customers  
https://stage.wepay.com/press  

I initially built the static-html with Middleman, and then I integrated the html-templates into WePay's PHP view/controller environment. The pages above have changed a little bit since, but you can view my original static-html in the `build` folder.

Technologies used:

* LESS
* jQuery
* responsive web (Bootstrap 3)
* CSS3 transitions and animations

Middleman
=====

This project uses [Middleman](http://middlemanapp.com/) to compile the files in the `source` folder into static files in the `build` folder.

## Requirements
1. Ruby
2. Xcode Command line tools
3. [Middleman](http://middlemanapp.com/)

The `Xcode Command line tools` can be installed through Xcode, or it can be downloaded as a standalone without installing Xcode at [http://developer.apple.com/downloads/index.action](http://developer.apple.com/downloads/index.action). Sign in, or register, with an Apple ID and search for "command line tool".

## Install Middleman

```shell
gem install middleman
```
If you get a permission error, you might need to do `sudo gem install middleman`. This means you're modifying the Mac system's version of Ruby that comes pre-installed by Apple. While it's OK to make minor modifications to that if you know what you're doing, it would be better to install another separate version of Ruby (following the instructions below).

## How to install Ruby
(These instructions were only tested on Mac OSX.)

### Install Homebrew

```shell
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"
```

### Install RBenv

```shell
brew install rbenv ruby-build
```
Note: If you have RVM installed, or previously installed rbenv, run these two lines to remove them before installing rbenv.

```shell
rvm implode
rm -rf ~/.rbenv
```

Some useful commands:

```shell
cd ~        Navigate to home directory
ls -la      List all files, including hidden files
```
Create a `.bash_profile` (or `.zshrc`) file if you don't have one on your home directory (~):

```shell
cd ~
ls -la
touch .bash_profile
nano .bash_profile
```
Copy and paste this into the nano editor in the Terminal:

```shell
# RBENV
export RBENV_ROOT=/usr/local/var/rbenv
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
```
In nano, `Ctrl+X` to exit and save. When prompted to save, type `Y` for "yes".

Then back in the Terminal prompt:

```shell
source .bash_profile
```

At this point, quit and restart Terminal for rbenv to take effect.

Some rbenv commands:

```shell
rbenv install -l     List all available versions for install.
rbenv versions       List all versions of ruby currently installed on your machine.
```
Finally use rbenv to install a version of ruby and make it the default.

```shell
rbenv install 1.9.3-p484
rbenv global 1.9.3-p484
rbenv rehash
```
Now if you type `ruby -v` in the Terminal, it should print out `ruby 1.9.3-p484`.


