import_export_all
=================

A Tiny Tiny RSS (http://tt-rss.org) plugin to import and export all articles.

Installation
------------
 - From your TT-RSS directory, run
    `git clone git://github.com/lotrfan/ttrss_import_export_all.git plugins/import_export_all`
 - Enable the plugin:
   - If you are not going to use the command line importer (see below), you can enable it in the TT-RSS preferences page.
   - If you plan on using the command line importer, you need to enable it as a system plugin by adding `import_export_all` to the `PLUGINS` line in `config.php`.

Exporting
---------
 - In the Feeds tab in preferences, the should be a new pane labeled `Import and export everything`.
 - Click the export button, and be prepared to wait awhile.

Importing via the command line
------------------------------
 - Backup your database.
 - Actually backup your database.
 - Make sure that the plugin is enabled in `config.php` (not as a user-enabled plugin).
 - Run, as the web server user,
    `php /path/to/tt-rss/update.php --xml_import_all /path/to/exported/file.xml.gz`
   e.g., if your web server runs as `http`:
    `sudo -u http php /path/to/tt-rss/update.php --xml_import_all /path/to/exported/file.xml.gz`
 - Wait for a long while (if you have a large number of articles to import).

Importing via the web interface
-------------------------------
 - Backup your database.
 - Actually backup your database.
 - Use the file upload form in the Feeds tab in preferences. (The same place as the exporter.)
 - If you run into issues, check that the `upload_max_filesize` and `post_max_size` settings in `php.ini` are at least as big as your file you are trying to import.
 - The web interface currently does not give any indication of progress; it could take a few minutes to finish importing everything.
