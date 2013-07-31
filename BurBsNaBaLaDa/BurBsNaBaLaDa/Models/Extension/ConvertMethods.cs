using System;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace BurBsNaBaLaDa.Models
{
	public static partial class ExtensionMethods
	{
		public static Char? ToNChar(this Object o)
		{
			Char? c;

			try
			{
				c = Convert.ToChar(o);
			}
			catch (Exception)
			{
				c = null;
			}

			return c;
		}

		public static Char ToChar(this Object o)
		{
			try
			{
				return Convert.ToChar(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static Boolean? ToNBoolean(this Object o)
		{
			Boolean? b;

			if (o.IsNull())
			{
				return null;
			}

			try
			{
				b = Convert.ToBoolean(o);
			}
			catch (Exception)
			{
				b = null;

				if (o.IsBooleanString())
					return o.ToBooleanString();
			}

			return b;
		}

		public static Boolean ToBoolean(this Object o, Boolean checkBooleanString = true)
		{
			try
			{
				return Convert.ToBoolean(o);
			}
			catch (Exception)
			{
				if (checkBooleanString && o.IsBooleanString())
					return o.ToBooleanString();

				throw new ConvertExtensionException();
			}
		}

		public static Boolean ToBooleanString(this Object o)
		{
			if (o.ToString().ToUpper() == "S" || o.ToString().ToUpper() == "TRUE")
				return true;
			else
				return false;
		}

		public static Boolean? ToNBooleanString(this Object o)
		{
			if (o.IsNull())
				return null;
			else if (o.ToBooleanString())
				return true;
			else
				return false;
		}

		public static int? ToNInt(this Object o)
		{
			int? i;

			try
			{
				if (o.IsNull())
					return null;

				i = (int)o;
			}
			catch (Exception)
			{
				i = null;
			}

			return i;
		}

		public static int ToInt(this Object o)
		{
			try
			{
				return (int)o;
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static Int16? ToNInt16(this Object o)
		{
			Int16? i;

			try
			{
				if (o.IsNull())
					return null;

				i = Convert.ToInt16(o);
			}
			catch (Exception)
			{
				i = null;
			}

			return i;
		}

		public static Int16 ToInt16(this Object o)
		{
			try
			{
				return Convert.ToInt16(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static Int32? ToNInt32(this Object o)
		{
			Int32? i;

			try
			{
				if (o.IsNull())
					return null;

				i = Convert.ToInt32(o);
			}
			catch (Exception)
			{
				i = null;
			}

			return i;
		}

		public static Int32 ToInt32(this Object o)
		{
			try
			{
				return Convert.ToInt32(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static Int64? ToNInt64(this Object o)
		{
			Int64? i;

			try
			{
				if (o.IsNull())
					return null;

				i = Convert.ToInt64(o);
			}
			catch (Exception)
			{
				i = null;
			}

			return i;
		}

		public static Int64 ToInt64(this Object o)
		{
			try
			{
				if (o.IsNullOrEmpty())
				{
					return 0;
				}

				return Convert.ToInt64(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static Decimal? ToNDecimal(this Object o)
		{
			Decimal? d;

			try
			{
				d = Convert.ToDecimal(o);
			}
			catch (Exception)
			{
				d = null;
			}

			return d;
		}

		public static Decimal ToDecimal(this Object o)
		{
			try
			{
				return Convert.ToDecimal(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static DateTime? ToNDateTime(this Object o)
		{
			DateTime? d;

			try
			{
				d = Convert.ToDateTime(o);
			}
			catch (Exception)
			{
				d = null;
			}

			return d;
		}

		public static DateTime ToDateTime(this Object o)
		{
			try
			{
				return Convert.ToDateTime(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static Double? ToNDouble(this Object o)
		{
			Double? d;

			try
			{
				d = Convert.ToDouble(o);
			}
			catch (Exception)
			{
				d = null;
			}

			return d;
		}

		public static Double ToDouble(this Object o)
		{
			try
			{
				return Convert.ToDouble(o);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}
		}

		public static TimeSpan? ToNTimeSpan(this Object o)
		{
		   TimeSpan? t;

		   try
		   {
			  t = TimeSpan.Parse(o.ToString());
		   }
		   catch (Exception)
		   {
			  t = null;
		   }

		   return t;
		}

		public static TimeSpan ToTimeSpan(this Object o)
		{
		   try
		   {
			  return TimeSpan.Parse(o.ToString());
		   }
		   catch (Exception)
		   {
			  throw new ConvertExtensionException();
		   }
		}

		public static FormCollection ToFormCollection(this NameValueCollection nvc)
		{
			FormCollection f = new FormCollection();

			try
			{
				foreach (String key in nvc.AllKeys)
					f.Add(key, nvc[key]);
			}
			catch (Exception)
			{
				throw new ConvertExtensionException();
			}

			return f;
		}



		public static IOrderedQueryable<T> ToOrderedQueryable<T>(this IQueryable<T> query)
		{
			return (IOrderedQueryable<T>)query;
		}

		public static String ToStringWithoutAccents(this Object o, Boolean isSearch = false)
		{
			if (o == null)
			{
				return "";
			}

			String str = o.ToString();

			if (!isSearch)
			{
				str = Regex.Replace(str, "[aáàâãª]", "a");
				str = Regex.Replace(str, "[AÁÀÂÃ]", "A");
				str = Regex.Replace(str, "[eéèê]", "e");
				str = Regex.Replace(str, "[EÉÈÊ]", "E");
				str = Regex.Replace(str, "[iíìî]", "i");
				str = Regex.Replace(str, "[IÍÌÎ]", "I");
				str = Regex.Replace(str, "[oóòôõº]", "o");
				str = Regex.Replace(str, "[OÓÒÔÕ]", "O");
				str = Regex.Replace(str, "[uúùû]", "u");
				str = Regex.Replace(str, "[UÚÙÛ]", "U");
				str = Regex.Replace(str, "[cç]", "c");
				str = Regex.Replace(str, "[CÇ]", "C");
			}
			else
			{
				str = Regex.Replace(str, "[aáàâãª]", "[aáàâãª]");
				str = Regex.Replace(str, "[AÁÀÂÃ]", "[AÁÀÂÃ]");
				str = Regex.Replace(str, "[eéèê]", "[eéèê]");
				str = Regex.Replace(str, "[EÉÈÊ]", "[EÉÈÊ]");
				str = Regex.Replace(str, "[iíìî]", "[iíìî]");
				str = Regex.Replace(str, "[IÍÌÎ]", "[IÍÌÎ]");
				str = Regex.Replace(str, "[oóòôõº]", "[oóòôõº]");
				str = Regex.Replace(str, "[OÓÒÔÕ]", "[OÓÒÔÕ]");
				str = Regex.Replace(str, "[uúùû]", "[uúùû]");
				str = Regex.Replace(str, "[UÚÙÛ]", "[UÚÙÛ]");
				str = Regex.Replace(str, "[cç]", "[cç]");
				str = Regex.Replace(str, "[CÇ]", "[CÇ]");
			}

			return str;
		}

		public static string _URLEncode(this String str)
		{
			return Convert.ToBase64String(Encoding.UTF8.GetBytes(str));
		}
		public static string _URLDecode(this String str)
		{
			return Encoding.UTF8.GetString(Convert.FromBase64String(str));
		}
	}
}
