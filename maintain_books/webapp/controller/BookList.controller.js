sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function(Controller, Fragment, MessageToast) {
    'use strict';
    return Controller.extend("org.ubb.books.controller.BookList", {
		
		onSelect(oEvent) {
			this.getView().byId("updateButton").setEnabled(true);
			this.getView().byId("deleteButton").setEnabled(true);
		},
		
        onDelete(oEvent) {
            const selectedRow = this.byId("idBooksTable").getSelectedContexts();
            const sPathToBook = selectedRow[0].getPath();

            this.getView().getModel().remove(sPathToBook, {
                success: () => {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("deleteSuccess"));
                },
                error: () => {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("globalError"));
                }
            });
        },

        onAdd : function () {

            if (!this.addDialog) {
                this.addDialog = sap.ui.xmlfragment("org.ubb.books.view.AddDialog", this);
				this.getView().addDependent(this.addDialog);
            }
            this.addDialog.open();
        },
		
        saveBookInDatabase(oEvent) {
			var objectBook = {
				Isbn: null,
				Author: null,
				Title: null,
				Publish: null,
				Available: null,
				Lang: null
            };
            
            var oSimpleForm = oEvent.getSource().getParent().getParent();
            var aItems = oSimpleForm.getFormElements();
            var oControl = aItems[0].getFields()[0];
            
			if (oControl.getValue().length !== 0) {
				objectBook.Isbn = oControl.getValue();
			}
            
			oControl = aItems[1].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Author = oControl.getValue();
			}
            
			oControl = aItems[2].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Title = oControl.getValue();
			}
			
			oControl = aItems[3].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Publish = oControl.getDateValue();
			}
       
			oControl = aItems[4].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Available = parseInt(oControl.getValue());
			}

			oControl = aItems[5].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Lang = oControl.getValue();
			}
            
            this.getView().getModel().setUseBatch(false);
            
            this.getView().getModel().create("/Books", objectBook,{ 
                success: () =>  {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("addSuccess"));
					this.getView().getModel().refresh();
                },
                error: (oError) => {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("globalError"));
                }
            });
			
			this.addDialog.close();
			this.getView().removeDependent(this.addDialog);
			this.addDialog.destroy(true);
			this.addDialog = null;
        }, 

        onUpdate : function () {
			
            if (!this.updateDialog) {
                this.updateDialog = sap.ui.xmlfragment("org.ubb.books.view.UpdateDialog", this);
				this.getView().addDependent(this.updateDialog);
			}
            this.updateDialog.open();
        },

        updateBookInDatabase(oEvent) { 
            const oBindingObject = this.byId("idBooksTable").getSelectedContexts()[0].getObject();

            var objectBook = {
				Isbn: oBindingObject.Isbn,
				Author: oBindingObject.Author,
				Title: oBindingObject.Title,
				Publish: oBindingObject.Publish,
				Available: oBindingObject.Available,
				Lang: oBindingObject.Lang
            };
            
            var oSimpleForm = oEvent.getSource().getParent().getParent();
            var aItems = oSimpleForm.getFormElements();
            var oControl = aItems[0].getFields()[0];
    
			oControl = aItems[0].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Author = oControl.getValue();
			}
            
			oControl = aItems[1].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Title = oControl.getValue();
			}
            
			oControl = aItems[2].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Publish = oControl.getDateValue();
			}

			oControl = aItems[3].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Available = oControl.getValue();
			}
            
			oControl = aItems[4].getFields()[0];
			if (oControl.getValue().length !== 0) {
				objectBook.Lang = oControl.getValue();
			}
            
            this.getView().getModel().update("/Books(Isbn='"+oBindingObject.Isbn+"')", objectBook,{ 
                success: () =>  {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("updateSuccess"));
					this.getView().getModel().refresh();
                },
                error: () => {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("globalError"));
                }
            });
			
			this.updateDialog.close();
			this.getView().removeDependent(this.updateDialog);
			this.updateDialog.destroy(true);
			this.updateDialog = null;
        }
    });
});