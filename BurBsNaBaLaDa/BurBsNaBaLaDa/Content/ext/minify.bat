:erase /F /S "$(SolutionDir)CMS\Content\ext\cms-min" /Q
:"$(SolutionDir)DLL\ajaxmin\ajaxmin.exe" -JS -xml "$(SolutionDir)CMS\Content\ext\minify.xml"

erase /F /S "cms-min" /Q
"../../../CMS/ajaxmin/AjaxMin.exe" -JS -xml "../../../CMS/Content/ext/minify.xml"