Ext.form.field.Date.override({format:"d/m/Y",mask:"99/99/9999",maxLength:10,getModelData:function(){var t=this,n={},i=t.getValue();return n[t.getName()]=i,n},getSubmitData:function(){var n=this,i=null,t=n.getValue();return(n.submitValue||n.isSubmit)&&Ext.isDate(t)&&(t=Ext.Date.format(t,n.format),i={},i[n.getName()]=t),i},initComponent:function(){this.mask&&(this.plugins=[new CMS.mask(this.mask)]),this.callParent()},getValue:function(){var t=this,i=t.rawToValue(t.processRawValue(t.getRawValue()));return t.value=i,t.isSearch===!0&&Ext.isDate(i)&&(i=Ext.Date.format(i,t.format)),i}})