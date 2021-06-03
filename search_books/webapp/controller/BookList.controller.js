sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Fragment, MessageToast, Filter, FilterOperator) {
    'use strict';
    return Controller.extend("org.ubb.books.controller.BookList", {
		 onCheckout(oEvent) {
			var oButton = oEvent.getSource();
			var oBindingContext = oButton.getBindingContext();
			var oBindingObject = oBindingContext.getObject();
			
			if (oBindingObject.Available == 0){
				MessageToast.show("There are no books left.");
			}
			else {
				var objectBook = {
					Isbn: oBindingObject.Isbn,
					Author: oBindingObject.Author,
					Title: oBindingObject.Title,
					Publish: oBindingObject.Publish,
					Available: oBindingObject.Available - 1,
					Lang: oBindingObject.Lang,
				};
				
				var checkedBook = {
					Isbn: oBindingObject.Isbn,
					Title: oBindingObject.Title, 
					Author: oBindingObject.Author,
					FirstName: "",
					LastName: "",
					Username: "",
					Checkoutd: oBindingObject.Publish,
					Returnd: oBindingObject.Publish,
				}
				
				this.getView().getModel().update("/Books(Isbn='"+oBindingObject.Isbn+"')", objectBook);
				this.getView().getModel().create("/CheckedBooks", checkedBook);
				oButton.getParent().getCells()[4].setText(oBindingObject.Available - 1);
			}
		 },
		onSearch : function (oEvent) {

			// build filter array
			var aFilter = [];
			var aField = this.getView().byId("isbn").getValue();
			if (aField) {
				aFilter.push(new Filter("Isbn", FilterOperator.Contains, aField));
			}
			
			var aField = this.getView().byId("author").getValue();
			if (aField) {
				aFilter.push(new Filter("Author", FilterOperator.Contains, aField));
			}
			
			var aField = this.getView().byId("title").getValue();
			if (aField) {
				aFilter.push(new Filter("Title", FilterOperator.Contains, aField));
			}
			
			var aField = this.getView().byId("pdate").getValue();
			if (aField) {
				aFilter.push(new Filter("Publish", FilterOperator.EQ, aField));
			}
			
			var aField = this.getView().byId("language").getValue();
			if (aField) {
				aFilter.push(new Filter("Lang", FilterOperator.EQ, aField));
			}
			
			// filter binding
			var oList = this.getView().byId("idBooksTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
    });
});