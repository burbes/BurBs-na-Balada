using System.Configuration;
using System.IO;
using System.Web.Mvc;

namespace BurBsNaBaLaDa.Models
{
	public static class UrlHelperExtensions
	{
		private readonly static string jsCMSPath = ConfigurationManager.AppSettings["JSMIN"].ToBooleanString() ? "/Content/ext/cms-min/" : "/Content/ext/cms/";
		private readonly static string jsAppPath = "/Content/ext/apps/";
		private readonly static string CMSPath = System.Web.HttpContext.Current.Request.PhysicalApplicationPath;

		private static string getTS(string path)
		{
			var fi = new FileInfo(path);

			if (fi != null)
				return fi.LastWriteTime.Ticks.ToString();

			return string.Empty;
		}

		public static string NoCacheContent(this UrlHelper helper, string fileName)
		{
			return helper.Content(string.Format("~/{0}?ts={1}", fileName, getTS(fileName)));
		}

		public static string JSCMSContent(this UrlHelper helper, string jsFileName)
		{
			return helper.Content(string.Format("~/{0}{1}?ts={2}", jsCMSPath, jsFileName, getTS(string.Format("{0}{1}/{2}", CMSPath, jsCMSPath, jsFileName))));
		}

		public static string JSAppContent(this UrlHelper helper, string jsFileName)
		{
			return helper.Content(string.Format("~/{0}{1}?ts={2}", jsAppPath, jsFileName, getTS(string.Format("{0}{1}/{2}", CMSPath, jsAppPath, jsFileName))));
		}
	}
}
