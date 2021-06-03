sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/table/library",
	"sap/ui/model/FilterOperator"
], function(Controller, Fragment, MessageToast, Filter, library, FilterOperator) {
    'use strict';
    return Controller.extend("org.ubb.books.controller.BookList", {
		
		onSearch : function (oEvent) {

			// build filter array
			var aFilter = [];
			var aField = this.getView().byId("first-name").getValue();
			if (aField) {
				aFilter.push(new Filter("FirstName", FilterOperator.Contains, aField));
			}
			
			var aField = this.getView().byId("last-name").getValue();
			if (aField) {
				aFilter.push(new Filter("LastName", FilterOperator.Contains, aField));
			}
			
			var aField = this.getView().byId("author").getValue();
			if (aField) {
				aFilter.push(new Filter("Author", FilterOperator.Contains, aField));
			}
			
			var aField = this.getView().byId("title").getValue();
			if (aField) {
				aFilter.push(new Filter("Title", FilterOperator.Contains, aField));
			}
			
			// filter binding
			var oList = this.getView().byId("idBooksTable");
			var oBinding = oList.getBinding("rows");
			oBinding.filter(aFilter);
		}
    });
});