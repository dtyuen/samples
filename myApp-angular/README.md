Note: The "same origin policy" will prevent Chrome and FireFox from loading Angular-templates locally from file://

To workaround this:

https://dev.to/dengel29/loading-local-files-in-firefox-and-chrome-m9f

* On FireFox, navigate to **about:config** in the Firefox browser<br/>
  search for **security.fileuri.strict_origin_policy**<br/>
  toggle that to **false**

* On Chrome, set a --allow-file-access-from-files flag when running Chrome from the command line:<br/>
  **chrome.exe --allow-file-access-from-files**
