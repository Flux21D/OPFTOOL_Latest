%~dp0exe\node.exe %~dp0bin\copy.js -o %2
%~dp0exe\node.exe %~dp0bin\header_Update.js -i %1 -o %2\OEBPS\html
%~dp0exe\node.exe %~dp0bin\ScaleRemoval.js -i %1\template.css -o %2\OEBPS\css\template.css
%~dp0exe\node.exe %~dp0bin\filesCopy.js -i %1 -o %2