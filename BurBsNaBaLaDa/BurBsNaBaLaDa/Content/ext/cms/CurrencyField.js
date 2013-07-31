Ext.define('Ext.ux.form.CurrencyField', {
	extend: 'Ext.form.field.Text',
	alias: 'widget.currencyfield',
	enableKeyEvents: true,
	isPercent: false,
	centsLimit: 2,
	maxLength: 10,
	skipDefault: false,
	prefix: '',
	centsSeparator: ',',
	thousandsSeparator: '.',
	limit: false,
	clearPrefix: false,
	allowNegative: false,
	is_number: /[0-9]/,
	toDecimal: function () {
		var v = this.getValue().toString();

		if (!v)
			return null;

		while (v.indexOf('.') != -1) {
			v = v.replace('.', '');
		};

		return parseFloat(v.replace(',', '.'));
	},
	to_numbers: function (str) {
		var formatted = '';

		for (var i = 0; i < (str.length); i++) {
			char_ = str.charAt(i);

			if (formatted.length == 0 && char_ == 0) {
				char_ = false;
			};

			if (char_ && char_.match(this.is_number)) {
				if (this.limit && formatted.length < this.limit) {
					formatted = formatted + char_;
				} else {
					formatted = formatted + char_;
				};
			};
		};

		return formatted;
	},
	fill_with_zeroes: function (str) {
		while (str.length < (this.centsLimit + 1)) {
			str = '0' + str;
		};

		return str;
	},
	price_format: function (str, isInternal, isPercent) {
		if (isInternal !== true) {
			str = parseFloat(str).toString();
		};

		if (isPercent === true) {
			this.setPercent(true);
		};

		var formatted = this.fill_with_zeroes(this.to_numbers(str));
		var thousandsFormatted = '';
		var thousandsCount = 0;
		var centsVal = formatted.substr(formatted.length - this.centsLimit, this.centsLimit);
		var integerVal = formatted.substr(0, formatted.length - this.centsLimit);

		formatted = integerVal + this.centsSeparator + centsVal;

		if (this.thousandsSeparator) {
			for (var j = integerVal.length; j > 0; j--) {

				char_ = integerVal.substr(j - 1, 1);
				thousandsCount++;

				if (thousandsCount % 3 == 0) {
					char_ = this.thousandsSeparator + char_;
				};

				thousandsFormatted = char_ + thousandsFormatted;
			};

			if (thousandsFormatted.substr(0, 1) == this.thousandsSeparator) {
				thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
			};

			formatted = thousandsFormatted + this.centsSeparator + centsVal;
		};

		if (this.allowNegative && str.indexOf('-') != -1 && (integerVal != 0 || centsVal != 0)) {
			formatted = '-' + formatted;
		};

		if (this.prefix) {
			formatted = this.prefix + formatted;
		};

		if (isPercent === true) {
			this.setMoney(true);
		};

		return formatted;
	},
	key_check: function (e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		var typed = String.fromCharCode(code);
		var functional = false;
		var str = this.getValue();
		var newValue = this.price_format(str + typed, true);

		if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
			functional = true;
		};

		if (code == 8 || code == 9 || code == 13 || code == 46 || code == 37 || code == 39) {
			functional = true;
		};

		if (this.allowNegative && (code == 189 || code == 109)) {
			functional = true;
		};

		if (!functional) {
			e.preventDefault();
			e.stopPropagation();

			if (str != newValue) {
				this.setValue(newValue);
			};
		};
	},
	price_it: function () {
		var str = this.getValue();
		var price = this.price_format(this.getValue(), true);

		if (str != price) {
			this.setValue(price);
		};
	},
	add_prefix: function () {
		this.setValue(this.prefix + this.getValue());
	},
	clear_prefix: function (setValue) {
		if (Ext.String.trim(this.prefix) != '' && this.clearPrefix) {
			var array = this.getValue().split(this.prefix);

			if (setValue !== true) {
				this.setValue(array[1]);
			} else {
				return array[1];
			};
		};

		return this.value ? this.value : '';
	},
	initComponent: function () {
		if (this.skipDefault === false) {
			if (this.isPercent === true) {
				this.setPercent(true);
			} else {
				this.setMoney(true);
			};
		};

		this.on('blur', function () {
			this.clear_prefix();
		}, this);

		this.on('focus', function () {
			this.add_prefix();
		}, this);

		return this.callParent(arguments);
	},
	onKeyDown: function (e) {
		this.fireEvent('keydown', this, e);

		this.key_check(e);
	},
	onKeyUp: function (e) {
		this.fireEvent('keyup', this, e);

		this.price_it(e);
	},
	setValue: function (value, skipFormat) {
		if (value) {
			value = value.toString();

			if (skipFormat !== true) {
				var tempValue = this.price_format(value, true);

				if (tempValue != value) {
					value = tempValue;
				};
			};
		};

		var me = this;
		me.setRawValue(me.valueToRaw(value));
		return me.mixins.field.setValue.call(me, value);
	},
	processRawValue: function (value) {
		if (this.isSubmit === true) {
			value = this.clear_prefix(true).toString();

			var tempValue = this.price_format(value, true);

			if (tempValue != value) {
				value = tempValue;
			};

			while (value.indexOf(this.thousandsSeparator) != -1) {
				value = value.replace(this.thousandsSeparator, '');
			};

			return value;
		} else {
			return value;
		};
	},
	getPercent: function (value) {
		if (value) {
			return value.toString() + '0';
		};

		return this.getValue() + '0';
	},
	setPercent: function (skipReset, centsLimit, maxLength) {
		if (this.skipDefault === false) {
			this.centsLimit = centsLimit ? centsLimit : this.centsLimit;
			this.maxLength = maxLength ? maxLength : this.maxLength;
		};

		if (!this.isPercent) {
			this.setValue(this.getPercent(), true);
		};

		this.isPercent = true;

		if (skipReset !== true) {
			this.reset();
		};
	},
	getMoney: function (value) {
		var v = null;

		if (value) {
			v = value.toString();
		} else {
			v = this.getValue();
		};

		v = v.substring(0, v.length - 1).replace(',', '');
		v = v.substring(0, v.length - this.centsLimit) + ',' + v.substring(v.length - this.centsLimit);

		return v;
	},
	setMoney: function (skipReset, centsLimit, maxLength) {
		if (this.skipDefault === false) {
			this.centsLimit = centsLimit ? centsLimit : this.centsLimit;
			this.maxLength = maxLength ? maxLength : this.maxLength;
		};

		if (this.isPercent) {
			this.setValue(this.getMoney(), true);
		};

		this.isPercent = false;

		if (skipReset !== true) {
			this.reset();
		};
	},
	getSubmitData: function () {
		var me = this,
            data = null;
		if (me.submitValue && !me.isFileUpload()) {
			data = {};
			data[me.getName()] = '' + me.getValue();
		}
		return data;
	},
	getModelData: function () {
		var me = this,
            data = null;
		if (!me.isFileUpload()) {
			data = {};
			data[me.getName()] = me.getValue();
		}
		return data;
	}
});