Ext.form.field.Base.override({originalDisabled:!1,initValue:function(){var n=this;n.originalValue=n.lastValue=n.value,n.originalDisabled=n.disabled,n.suspendCheckChange++,n.setValue(n.value),n.suspendCheckChange--},reset:function(){var n=this;n.setDisabled(n.originalDisabled),n.setValue(n.originalValue),n.clearInvalid(),delete n.wasValid},checkChangeEvents:Ext.isIE&&(!document.documentMode||document.documentMode<9)?["changefilter","change","propertychange"]:["changefilter","change","input","textInput","keyup","dragdrop"]}),Ext.form.field.Field.override({initField:function(){this.addEvents("changefilter","change","validitychange","dirtychange"),this.initValue()},checkChange:function(){if(!this.suspendCheckChange){var n=this,t=n.getValue(),i=n.lastValue;if(!n.isEqual(t,i)&&!n.isDestroyed){n.lastValue=t,n.fireEvent("changefilter",n,t,i),n.fireEvent("change",n,t,i);n.onChange(t,i)}}}})