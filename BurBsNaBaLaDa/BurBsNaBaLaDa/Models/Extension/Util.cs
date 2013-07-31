using System;
using System.Reflection;

namespace BurBsNaBaLaDa.Models
{
	public static partial class ExtensionMethods
	{
		/// <summary>
		/// Altera o valor de uma propriedade de um tipo anonimo.
		/// </summary>
		/// <param name="obj">Objeto que tera a propriedade alterada.</param>
		/// <param name="property">Propriedade a ser alterada.</param>
		/// <param name="value">Valor para inserir na propriedade.</param>
		public static void SetAnonymousPropertyValue(this Type type, object obj, string property, object value)
		{
			type.GetField(String.Format("<{0}>i__Field", property), BindingFlags.NonPublic | BindingFlags.Instance)
				.SetValue(obj, value);
		}

		public static int MonthDifference(this DateTime lValue, DateTime rValue)
		{
			return Math.Abs((lValue.Month - rValue.Month) + 12 * (lValue.Year - rValue.Year));
		}

		public static DateTime FirstDayOfMonth(this DateTime data)
		{
			return data.Date.AddDays(-(data.Day - 1));
		}
	}
}