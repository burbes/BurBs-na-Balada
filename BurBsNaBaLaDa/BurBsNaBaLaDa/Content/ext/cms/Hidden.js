Ext.form.field.Hidden.override({
   isSubmit: false,
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