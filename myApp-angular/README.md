Note: On Chrome, the "same origin policy" will prevent Chrome from loading Angular-templates locally from file://

There are three options to workaround this:

* Use FireFox
* Or, load this app through a web server
* Or, set a flag on Chrome. You can do this by running Chrome from the command line as chrome --allow-file-access-from-files
