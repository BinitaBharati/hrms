class MenuItem extends React.Component 
{

        constructor(props) {
            super(props);
            // Just to see what was passed...
            console.log('MenuItem: constructor --> got props '+JSON.stringify(props, null, "\t"));
        }
		
		//overriding React.component render's function
        render() {
           var someMenuItem = React.createElement('a', {href: '#', className: 'list-group-item', onClick: this.props.handleClick},                   
					this.props.menuName
					);
	      return someMenuItem;
        }
}


class Form extends React.Component {
	
	  constructor(props) {
            super(props);
			this.state = props.jsonState;//Refer : https://reactjs.org/docs/forms.html
            // Just to see what was passed...
            console.log('FormRow: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('FormRow: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
        }
		
	 handleOnChange(e) {
			this.setState({[e.target.name]: e.target.value});
		}
		
		//overriding React.component render's function
        render() {
           var formRow = React.createElement('form', {className: this.props.formClass, onChange: this.handleOnChange},                   
					this.props.rowChildren
					);
	      return formRow;
        }
}

class SucessMsg extends React.Component {
	 constructor(props) {
            super(props);
			this.state = props.msg;
			window.successMsg = this;
			
        }
		
		
		//overriding React.component render's function
		
        render() {
			var children = [React.createElement('strong', {}, 'Success!'), this.state];
            //var msgDiv = React.createElement('div', {className: 'alert alert-success'},  children);
			var msgDiv = React.createElement('div', {className: 'alert alert-success', 
			/* ref: (myElem) => 
			{
				console.log('SucessMsg:render refCallback '+myElem);
				window.successMsgComp = myElem;
			}*/
			//ref: this.props.prop1
			},  children);
	        return msgDiv;
        }
		
		getParentDomRef() {
			 let mountNode = ReactDOM.findDOMNode(this).parentNode;
			 console.log('getParentDomRef: mountNode = '+mountNode);
			 return mountNode;
		}
		
}

class FailureMsg extends React.Component {
	 constructor(props) {
            super(props);
			this.state = props.msg;
			
        }
		
		
		//overriding React.component render's function
        render() {
           var msgDiv = React.createElement('div', {className: 'alert alert-warning'},  
				[React.createElement('strong', {}, 'Error! ') , this.state]);
	      return msgDiv;
        }
		
}

class EmployeeForm extends React.Component {
	
	  constructor(props) {
            super(props);
			this.state = props.jsonState;//Refer : https://reactjs.org/docs/forms.html
            // Just to see what was passed...
            console.log('FormRow: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('FormRow: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
			this.handleOnChange = this.handleOnChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.closeForm = this.closeForm.bind(this);
			
        }
		
		
		
	 handleOnChange(e) {
		  console.log('handleOnChange : called for '+e.target.name);
		  console.log('handleOnChange : state of dobPicker =  '+this.state.dobPicker + ", dojPicker = "+this.state.dojPicker)
		 if (e.target.name == 'dob' || e.target.name == 'doj') {
			
			if (this.state.dobPicker == null) {
				console.log('dobPicker is null');
				this.setState({'dobPicker': new Pikaday({ field: document.getElementById('dob') })});
			}
			if (this.state.dojPicker == null) {
				console.log('dojPicker is null');
				this.setState({'dojPicker': new Pikaday({ field: document.getElementById('doj') })});
			}
			 
		 } else {
			 this.setState({[e.target.name]: e.target.value});
		 }
			
		}
		
		 closeForm() {
			 let mountNode = ReactDOM.findDOMNode(this).parentNode;
 
			try {
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
				 
		}
		
		showSuccessMsg(msg) {
			console.log('showSuccessMsg: entered with '+msg);
			var sucMsg = React.createElement(SucessMsg, {msg: msg, ref: (elem1) => {console.log('huha : elem1 =' +elem1);window.successMsgComp = elem1}}, null);
			var successMsgElem = ReactDOM.render(sucMsg, document.getElementById('msgDiv'));
			setTimeout(function () {
				console.log('showSuccessMsg: timeout expired');
 
			try {
				    //working solution 1
					//let mountNode = window.successMsg.getParentDomRef();
					//working solution 2
					//let mountNode = successMsgElem.getParentDomRef();
					//working solution 3
					//Ref : https://reactjs.org/docs/react-dom.html#render
					let mountNode = window.successMsgComp.getParentDomRef();
					
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
			}, 1000);
		}
		
		showFailureMsg(msg) {
			console.log('showFailureMsg: entered with '+msg);
			var errorMsg = React.createElement(FailureMsg, {msg: msg, ref: (elem1) => {console.log('huha : elem1 =' +elem1);window.errorMsgComp = elem1}}, null);
			var errorMsgElem = ReactDOM.render(errorMsg, document.getElementById('msgDiv'));
			setTimeout(function () {
				console.log('showFailureMsg: timeout expired');
 
			try {
				    //working solution 1
					//let mountNode = window.successMsg.getParentDomRef();
					//working solution 2
					//let mountNode = successMsgElem.getParentDomRef();
					//working solution 3
					//Ref : https://reactjs.org/docs/react-dom.html#render
					let mountNode = ReactDOM.findDOMNode(window.errorMsgComp).parentNode;
					
					
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
			}, 1000);
		}
		
		handleSubmit(e) {
		  e.preventDefault();
		  alert('handleSubmit: entered with target name = ' + e.target.name);
		  console.log('handleSubmit : called with alias =  '+this.state.alias + ", org = "+this.state.org + ", doj = "+this.state.dojPicker );
		  let type1 = typeof (this.state.dojPicker);
		  console.log('type of dojPicker '+ type1);
		  alert('handleSubmit : called with alias =  '+this.state.alias + ", org = "+this.state.org + ", doj = "+this.state.dojPicker);
		  this.closeForm();
		  
		  //invoke post request through vanilla java script fetch api - https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
		  //fetch API is not supported in all browsers (mostly Safari does not support it, but most browsers do support it )
		   var dobStr = '';
		   var dojStr = '';
		   if (this.state.dobPicker != null) {
			   dobStr = this.state.dobPicker.toString();
		   } else  if (this.state.dojPicker != null) {
			   dojStr = this.state.dojPicker.toString();
		   }
		   var postData = {
				 'alias' : this.state.alias,
			     'org': this.state.org,
				 'firstName' : this.state.firstName,
				 'lastName' : this.state.lastName,
				 'address': this.state.address,
				 'city': this.state.city,
				 'state': this.state.state1,
				 'country': this.state.country,
				 'dob': dobStr,
				 'doj': dojStr
				 
			
			};
			
			axios({
				method: 'post',
				url: '/hrms/add/employee',
				data: postData
			})
			
			/** 
				An arrow function expression is a syntactically compact alternative to a regular function expression,
				although without its own bindings to the this, arguments, super, or new.target keywords.
				Refer : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions	**/
			.then(response => {
			console.log('callback success '+response);
			this.showSuccessMsg(response.data.msg);
	       })
			.catch(error => {
				console.log(error);
				var response = error.response//axios adds these fields in response
				this.showFailureMsg(response.data.msg);
				
			});
			
			
		}
		
		
		
		
		//overriding React.component render's function
        render() {
			
			var titleForm = React.createElement('h6', {className: 'col-md-8'}, React.createElement('font', {color: 'blue'}, 'Add Employee'));
			
			var aliasRowChildren = [
	React.createElement('label',{className: 'col-md-4 control-label'}, 'Alias'), 
	React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
		React.createElement('input', {id: "alias", name: "alias", placeholder: "Alias", className: "form-control", required: "true", value: this.state.alias, type: "text", onChange: this.handleOnChange}, null))]
	var aliasRow = React.createElement('div', {className: 'form-group required'}, aliasRowChildren);
	
	//Organisation
	var orgRowChildren = [
	React.createElement('label',{className: 'col-md-4 control-label', for: 'org'}, 'Organisation'), 
	React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
	React.createElement('select', {id: "org", name: "org", placeholder: "Organisation", className: "form-control", required: "true", value: this.state.org, type: "text", onChange: this.handleOnChange}, 
	[React.createElement('option', {}, ''),
	React.createElement('option', {}, 'ABA')],
	React.createElement('option', {}, 'Zenith Systems'),
	React.createElement('option', {}, 'Nuova')))]
	var orgRow = React.createElement('div', {className: 'form-group required'}, orgRowChildren);
	
	//First and last name
	var firstAndLastNameRowChildren = [
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-4 control-label'}, 'First name'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "firstName", name: "firstName", placeholder: "First name", className: "form-control",  value: this.state.firstName, type: "text", onChange: this.handleOnChange}, null))
		]), 
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-4 control-label'}, 'Last name'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "lastName", name: "lastName", placeholder: "Last name", className: "form-control",  value: this.state.lastName, type: "text", onChange: this.handleOnChange}, null))
		])
	]
	var firstAndLastNameRow = React.createElement('div', {className: 'form-group form-row'}, firstAndLastNameRowChildren);
	
	//Address and City
	var addAndCityRowChildren = [
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-4 control-label'}, 'Address'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "address", name: "address", placeholder: "Address", className: "form-control",  value: this.state.address, type: "text", onChange: this.handleOnChange}, null))
		]), 
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-4 control-label'}, 'City'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "city", name: "city", placeholder: "City", className: "form-control",  value: this.state.city, type: "text", onChange: this.handleOnChange}, null))
		])
	]
	var addAndCityRow = React.createElement('div', {className: 'form-group form-row'}, addAndCityRowChildren);
	
	//State and Country
	var stateACountryRowChildren = [
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-4 control-label'}, 'State'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "state", name: "state", placeholder: "State", className: "form-control",  value: this.state.state1, type: "text", onChange: this.handleOnChange}, null))
		]), 
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-4 control-label'}, 'Country'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "country", name: "country", placeholder: "Country", className: "form-control",  value: this.state.country, type: "text", onChange: this.handleOnChange}, null))
		])
	]
	var stateAndCountryRow = React.createElement('div', {className: 'form-group form-row'}, stateACountryRowChildren);
	
	//DOB and DOJ
	var dobAndDojRowChildren = [
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-6 control-label'}, 'Date of birth'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "dob", name: "dob", placeholder: "DOB", className: "form-control",  value: this.state.dob, type: "text", onChange: this.handleOnChange, onFocus: this.handleOnChange}, null))
		]), 
	React.createElement('div',{className: 'col'}, 
		[React.createElement('label',{className: 'col-md-6 control-label'}, 'Date of joining'),
		React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
			React.createElement('input', {id: "doj", name: "doj", placeholder: "DOJ", className: "form-control", 
			value: this.state.doj, type: "text", onChange: this.handleOnChange, onFocus: this.handleOnChange
			}, null))
		])
	]
	var dobAndDojRow = React.createElement('div', {className: 'form-group form-row'}, dobAndDojRowChildren);
	
	var buttonElem = React.createElement('button', {id: "addEmployee", name: "addEmployee", className: "btn btn-lg btn-primary btn-block text-uppercase", type: "submit"}, 'Submit')
	var buttonCol  = React.createElement('div', {className: 'col'}, buttonElem);
	var buttonElem1 = React.createElement('button', {id: "closeAddEmployee", name: "closeAddEmployee", className: "btn btn-lg btn-primary btn-block text-uppercase", type: "submit"}, 'Close')
	var buttonCol1  = React.createElement('div', {className: 'col'}, buttonElem1);
	var buttonRow = React.createElement('div', {className: 'form-group form-row'}, [buttonCol, buttonCol1])
	
	
	//turn [aliasRow, orgRow, firstAndLastNameRow, addAndCityRow, stateAndCountryRow, dobAndDojRow, buttonRow];
	 var form = React.createElement('form', {className: 'well form-horizontal', method: 'post', onSubmit: this.handleSubmit},                   
			[titleForm, aliasRow, orgRow, firstAndLastNameRow, addAndCityRow, stateAndCountryRow, dobAndDojRow, buttonRow]
			);
	
	var td = React.createElement('td', {colSpan: "1"}, form);
    return td;
        }
}

class FormRow extends React.Component {
	
	constructor(props) {
            super(props);
			this.state = props.jsonState;//Refer : https://reactjs.org/docs/forms.html { isMultiColumn : true, rowData: [{label : {name : 'Alias'}, textInput : {id: 'alias': required : true, }}]}
            // Just to see what was passed...
            console.log('FormRow: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('FormRow: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
			this.handleOnChange = this.handleOnChange.bind(this);
			//this.handleSubmit = this.handleSubmit.bind(this);
			//this.closeForm = this.closeForm.bind(this);
			this.getComponentValue = this.getComponentValue.bind(this);
			
        }
				
		render() {
			//Form can render input type=text / select
			var rowData = this.state.rowData; //[{label : {name : 'Alias'}, textInput : {id: 'col1Alias': required : true, }},
											//{label : {name : 'First name'}, textInput : {id: 'alias', placeHolder : 'First name'}}]
											
			if (rowData.length > 1) {
				    var rowChildren = [rowData.length];
					for (var i = 0 ; i < rowData.length ; i++)
					{
						var colData = rowData[i];
						var colChildren = null;
						if (i == 0) {
							colChildren = this.populateColumnChildren(colData, 'col1');
						} else if (i == 1) {
							colChildren = this.populateColumnChildren(colData, 'col2');
						}
						
						rowChildren[i] = React.createElement('div', {className: 'col'}, colChildren);
				
					}
					var formRow = React.createElement('div', {className: 'form-group form-row'}, rowChildren);
					return formRow;
			
			} else {
				var rowChildren = this.populateColumnChildren(rowData[0], 'col1');
				var formRow = null;
				var required = false;
				if (rowData[0].hasOwnProperty('textInput')){
					required = rowData[0].textInput.required;
				} else if (rowData[0].hasOwnProperty('select')){
					required = rowData[0].select.required;
				}
				console.log('render: required set = '+rowData[0].required);
				if (required) {
					formRow = React.createElement('div', {className: 'form-group required'}, rowChildren);
				} else {
					formRow = React.createElement('div', {className: 'form-group'}, rowChildren);
				}
				 
				return formRow;
				
			}
											
			
			
			
		}
		
		populateColumnChildren(colData, colPosition) {
			     console.log('populateColumnChildren222: entered with '+JSON.stringify(colData));
		         var inputGrpChild = null;
				 var hasProp = colData.hasOwnProperty('textInput');
				 console.log('populateColumnChildren: hasProp = '+hasProp);
		         if (colData.hasOwnProperty('textInput')) {
					 if (colData.textInput.hasOwnProperty('disabled')) {
							  if (colPosition == 'col1') {
							 inputGrpChild = React.createElement('input', {id: colData.textInput.id, name: colData.textInput.id, placeholder: colData.textInput.placeHolder, className: "form-control", required: colData.textInput.required, value: this.state.col1, type: "text", onChange: this.handleOnChange, disabled: true}, null);
					 
						 } else if (colPosition == 'col2') {
							 inputGrpChild = React.createElement('input', {id: colData.textInput.id, name: colData.textInput.id, placeholder: colData.textInput.placeHolder, className: "form-control", required: colData.textInput.required, value: this.state.col2, type: "text", onChange: this.handleOnChange, disabled: true}, null);
					 
						 }
					 } else {
						 if (colPosition == 'col1') {
						 inputGrpChild = React.createElement('input', {id: colData.textInput.id, name: colData.textInput.id, placeholder: colData.textInput.placeHolder, className: "form-control", required: colData.textInput.required, value: this.state.col1, type: "text", onChange: this.handleOnChange}, null);
				 
					 } else if (colPosition == 'col2') {
						 inputGrpChild = React.createElement('input', {id: colData.textInput.id, name: colData.textInput.id, placeholder: colData.textInput.placeHolder, className: "form-control", required: colData.textInput.required, value: this.state.col2, type: "text", onChange: this.handleOnChange}, null);
				 
					 }
					 }
					 
				} else if (colData.hasOwnProperty('select')) {
					
						 let selectOptions = colData.select.options;
						 var selectOptionsChildElem = [selectOptions.length];
						 for (var j = 0 ; j < selectOptions.length ; j++) {
							 selectOptionsChildElem[j] = React.createElement('option', {}, selectOptions[j]);
						 }
						 
					if (colData.select.hasOwnProperty('disabled')) {
						 
						 if (colPosition == 'col1') {
							 inputGrpChild = React.createElement('select', {id: colData.select.id, name: colData.select.id, placeholder: colData.select.placeHolder, className: "form-control", required: colData.select.required, value: this.state.col1, type: "text", onChange: this.handleOnChange, disabled: true}, selectOptionsChildElem);
					
						 } else if (colPosition == 'col2') {
							 inputGrpChild = React.createElement('select', {id: colData.select.id, name: colData.select.id, placeholder: colData.select.placeHolder, className: "form-control", required: colData.select.required, value: this.state.col2, type: "text", onChange: this.handleOnChange, disabled: true}, selectOptionsChildElem);
					
						 }
					} else {
						 
						 if (colPosition == 'col1') {
							 inputGrpChild = React.createElement('select', {id: colData.select.id, name: colData.select.id, placeholder: colData.select.placeHolder, className: "form-control", required: colData.select.required, value: this.state.col1, type: "text", onChange: this.handleOnChange}, selectOptionsChildElem);
					
						 } else if (colPosition == 'col2') {
							 inputGrpChild = React.createElement('select', {id: colData.select.id, name: colData.select.id, placeholder: colData.select.placeHolder, className: "form-control", required: colData.select.required, value: this.state.col2, type: "text", onChange: this.handleOnChange}, selectOptionsChildElem);
					
						 }
					}
						 
						
				}
				 
				 var rowChildren = null;
				 
				 if (colData.label.hasOwnProperty('klass')){
					 rowChildren = [
										React.createElement('label',{className: colData.label.klass}, colData.label.name), 
										React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
										inputGrpChild )];
				 } else {
					 rowChildren = [
										React.createElement('label',{className: 'col-md-4 control-label'}, colData.label.name),
										React.createElement('div', {className: 'col-md-8 inputGroupContainer input-group'},
										inputGrpChild )];
				 }
				return rowChildren;
		}
		
		
		
		handleOnChange(e) {
		  console.log('FormRow handleOnChange: entered with '+JSON.stringify(this.state));
		  console.log('FormRow handleOnChange: aliasRow = '+window.aliasRow);
		  e.preventDefault();
		  console.log('handleOnChange22 : called for '+e.target.name);
		  
		   if (e.target.name.indexOf('Dob') != -1 || e.target.name.indexOf('Doj') != -1) {
			
			if (this.state.dobPicker == null) {
				console.log('dobPicker is null');
				this.setState({'dobPicker': new Pikaday({ field: document.getElementById('col1Dob') })});
			}
			if (this.state.dojPicker == null) {
				console.log('dojPicker is null');
				this.setState({'dojPicker': new Pikaday({ field: document.getElementById('col2Doj') })});
			}
			 
			 console.log('handleOnChange: state = ' + this.state.dobPicker);
		 } else {
			  if (this.state.isMultiColumn) {
			  if (e.target.name.startsWith('col1')) {
				  this.setState({['col1']: e.target.value});
			  } else if (e.target.name.startsWith('col2')) {
				  this.setState({['col2']: e.target.value});
			  }
			  
			  
		  }
		  
		  else {
			 this.setState({['col1']: e.target.value});
		 }
		 }
		 console.log('FormRow handleOnChange: exiting with '+JSON.stringify(this.state));
			
		}
		
		getComponentValue() {
			console.log('getComponentValue1: multiCol = '+this.state.isMultiColumn);
			 if (this.state.isMultiColumn) {
				 if (this.state.hasOwnProperty('dobPicker') || this.state.hasOwnProperty('dojPicker')) {
					 var returnJson = {'col1' : '', 'col2' : ''};
					 if (this.state.hasOwnProperty('dobPicker')) {
						 returnJson.col1 = this.state.dobPicker.toString();
					 }
					 if (this.state.hasOwnProperty('dojPicker')) {
						 returnJson.col2 = this.state.dojPicker.toString();
					 }
					 return returnJson;
				 } else {
					 	return {'col1' : this.state.col1, 'col2' : this.state.col2};

				 }
			 } else {
				 console.log('getComponentValue3');
				 return {'col1' : this.state.col1};
			 }
		}
	
	
	
}

class ProgressSpinner extends React.Component {
	
	constructor(props) {
            super(props);
			this.state = props.style1;//Refer : https://reactjs.org/docs/forms.html
            // Just to see what was passed...
            console.log('FormRow: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('FormRow: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
			//this.handleOnChange = this.handleOnChange.bind(this);
			this.hideProgressSpinner = this.hideProgressSpinner.bind(this);
			
        }
	
	   showProgressSpinner() {
		   this.state.style = '';
	   }
	   
	   hideProgressSpinner() {
		   /* console.log('hideProgressSpinner: entering with state as '+JSON.stringify(this.state));
		   this.state = {display: 'none'};
		    console.log('hideProgressSpinner: exiitng with state as '+JSON.stringify(this.state)); */
			let mountNode = ReactDOM.findDOMNode(this).parentNode;
 
			try {
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
	   }
	   
	   render() {
		   
			//progress spinner
			/* var loader = React.createElement('div', {className: 'loader-parent', style : 'display: '+ this.state.showProgressLoader
			}, React.createElement('div', {className: 'loader'}, [])); */
			var loader = React.createElement('div', {className: 'loader-parent', style : this.state
			}, React.createElement('div', {className: 'loader'}, []));
			return loader;
	   }
}

class SearchEmployeeForm extends React.Component {
	
	  constructor(props) {
            super(props);
			this.state = props;//Refer : https://reactjs.org/docs/forms.html
            // Just to see what was passed...
            console.log('FormRow: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('FormRow: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
			//this.handleOnChange = this.handleOnChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.closeForm = this.closeForm.bind(this);
			//this.showTable = this.showTable.bind(this);
			
        }
		
		//overriding React.component render's function
        render() {
			
			var titleForm = React.createElement('h6', {className: 'col-md-8'}, React.createElement('font', {color: 'blue'}, 'Search Employee'));
			var aliasRow = React.createElement(FormRow, {jsonState: {isMultiColumn: false,  rowData: [{label : {name : 'Alias'}, textInput : {id: 'col1Alias', placeHolder: 'Alias', required : false }}]}, 
														ref: (aliasRow) => {console.log('huha : aliasRow ref =' +aliasRow);window.aliasRow = aliasRow}});
			var orgRow = React.createElement(FormRow, {jsonState: 
															{isMultiColumn: false,  rowData: [{label : {name : 'Organisation'}, 
															select : {id: 'col1Org', placeHolder: 'Organisation', required : true, 
															options : ['', 'ABA', 'Katona Systems', 'Hakuna Matata'] }}]}, 
															ref: (orgRow) => {console.log('huha : orgRow ref =' +orgRow);window.orgRow = orgRow}});
			var firstAndLastNameRow = React.createElement(FormRow, {jsonState: 
																		{isMultiColumn: true, 
																		rowData: [{label : {name : 'First name'}, textInput : {id: 'col1FirstName', placeHolder: 'First name', required : false }},
			                                                                      {label : {name : 'Last name'}, textInput : {id: 'col2LastName', placeHolder: 'Last name', required : false }}]},
																		ref: (firstAndLastNameRow) => {console.log('huha : firstAndLastNameRow ref =' +firstAndLastNameRow);window.firstAndLastNameRow = firstAndLastNameRow}});
			var buttonElem = React.createElement('button', {id: "searchEmployee", name: "searchEmployee", className: "btn btn-lg btn-primary btn-block text-uppercase", type: "submit"}, 'Submit')
			var buttonCol  = React.createElement('div', {className: 'col'}, buttonElem);
			var buttonElem1 = React.createElement('button', {id: "closeSearchEmployee", name: "closeSearchEmployee", className: "btn btn-lg btn-primary btn-block text-uppercase", type: "submit"}, 'Close')
			var buttonCol1  = React.createElement('div', {className: 'col'}, buttonElem1);
			var buttonRow = React.createElement('div', {className: 'form-group form-row'}, [buttonCol, buttonCol1])
			
	
			//turn [aliasRow, orgRow, firstAndLastNameRow, addAndCityRow, stateAndCountryRow, dobAndDojRow, buttonRow];
			 var form = React.createElement('form', {className: 'well form-horizontal', method: 'post', onSubmit: this.handleSubmit},                   
					[titleForm, aliasRow, orgRow, firstAndLastNameRow, buttonRow]);
	
			 var td = React.createElement('td', {colSpan: "1"}, form);
			 return td;
        }
		
		
		closeForm() {
			 let mountNode = ReactDOM.findDOMNode(this).parentNode;
 
			try {
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
		}
		
			
			
		
		handleSubmit(e) {
			e.preventDefault();
			var aliasVal = window.aliasRow.getComponentValue();
			var orgVal = window.orgRow.getComponentValue();
			var firstAndLastNameVal = window.firstAndLastNameRow.getComponentValue();
			console.log('handleSubmit: aliasVal = '+ JSON.stringify(aliasVal) + ', orgVal = '+JSON.stringify(orgVal) + ', firstAndLastNameVal = '+JSON.stringify(firstAndLastNameVal));
			console.log('handleSubmit: aliasVal2 = '+ aliasVal);
			console.log('handleSubmit: orgRow = '+ window.orgRow);
			
			
			if (aliasVal.hasOwnProperty('col1')) {
				aliasVal = aliasVal.col1;
			} else {
				aliasVal = '';
			}
			
			if (orgVal.hasOwnProperty('col1')) {
				orgVal = orgVal.col1;
			} else {
				orgVal = '';
			}
			
			var firstName = '';
			var lastName = '';
			if (firstAndLastNameVal.hasOwnProperty('col1')) {
				firstName = firstAndLastNameVal.col1;
			} else if (firstAndLastNameVal.hasOwnProperty('col2')) {
				lastName = firstAndLastNameVal.col2;
			}
			var postData = {
					
			};
			
			if (aliasVal) { //Ensures that the value being checked is not undefined/null/empty string
				postData['alias'] = aliasVal;
			}
			if (orgVal) {
				postData['org'] = orgVal;
			}
			if (firstName) {
				postData['firstName'] = firstName;
			}
			if (lastName) {
				postData['lastName'] = lastName;
			}
			
			//First close EditEmployee formcloseForm
			this.closeForm();
			
			//Show loading spinner before making request.
			var loader = React.createElement(ProgressSpinner, {className: 'loader-parent', style1 : {display: 'block'},
			ref: (loaderRef) => {console.log('huha : loaderRef =' +loaderRef);window.loaderRef = loaderRef}
			}, React.createElement('div', {className: 'loader'}, []));			
			ReactDOM.render(loader, document.getElementById('msgDiv'));
			
			setTimeout(function () {
				console.log('showSuccessMsg: timeout expired');
 
			try {
					axios({
						method: 'post',
						url: '/hrms/search/employee',
						data: postData
					})
			
				/** 
				An arrow function expression is a syntactically compact alternative to a regular function expression,
				although without its own bindings to the this, arguments, super, or new.target keywords.
				Refer : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions	**/
					.then(response => {
					console.log('callback success '+JSON.stringify(response.data.matchedEmployees));
					window.loaderRef.hideProgressSpinner();
					var matchedEmployees = response.data.matchedEmployees;
					if (matchedEmployees != null && matchedEmployees.length > 0) {
						//add table headers
					var tHead = React.createElement('thead', {}, React.createElement(TableRow, {jsonState: [{th: {attributes: {scope: 'col'}, data: 'Organisation'}},{th: {attributes: {scope: 'col'}, data: 'Alias'}},
																								{th: {attributes: {scope: 'col'}, data: 'First name'}}, {th: {attributes: {scope: 'col'}, data: 'Last name'}}]
																								 }));
							
					//add table data
					var curNodeChildren = [matchedEmployees.length];
					for (var i = 0 ; i < matchedEmployees.length ; i++) {
						curNodeChildren[i] = React.createElement(TableRow, {jsonState: [{td: {data: matchedEmployees[i].organisation}}, {td: {data: matchedEmployees[i].alias, anchor: '/hrms/edit/employee'}},
																						{td: {data: matchedEmployees[i].first_name}}, {td: {data: matchedEmployees[i].last_name}}], rawData: matchedEmployees[i]
																						});
					}
					
					var tBody = React.createElement('tbody', {}, curNodeChildren);
					
					var tableElem = React.createElement('table', {className: 'table table-striped table-bordered',  
																 ref: (tableRef) => {
																						 console.log('tableRef : tableRef =' +tableRef);
																						 window.tableRef = tableRef
																				     }}, [tHead, tBody]);
					
					ReactDOM.render(tableElem, document.getElementById('tableDiv'));
					} else {
						showSuccessMsg(' Search employee results : No data found!');
					}
					
			
				   })
					.catch(error => {
						console.log(error);
						var response = error.response//axios adds these fields in response
						//this.showFailureMsg(response.data.msg);
						
					});
				} catch (e) {
					console.error(e);
				}
			}, 1000);
			
			
		}
}


//Refer : https://getbootstrap.com/docs/4.0/content/tables/
class TableRow extends React.Component {
	
	constructor(props) {
            super(props);
			this.state = props;//Refer : https://reactjs.org/docs/forms.html
            // Just to see what was passed...
            console.log('FormRow: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('FormRow: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
			//this.handleOnChange = this.handleOnChange.bind(this);
			//this.handleSubmit = this.handleSubmit.bind(this);
			//this.closeForm = this.closeForm.bind(this);
			this.handleClick = this.handleClick.bind(this);
			
        }
		
		handleClick(e) {
			console.log('handleClick66: entered with rawData ' + JSON.stringify(this.state.rawData) );
			//close search results table
			destroyComponent(window.tableRef);
			//open employee form in edit mode now
			var editEmpForm = React.createElement(EditEmployeeForm, {jsonState: this.state.rawData,  ref: (editEmpFormRef) => {
																						 console.log('editEmpFormRef : editEmpFormRef =' +editEmpFormRef);
																						 window.editEmpFormRef = editEmpFormRef
																				     }}, null);
		    console.log('TableRow: handleClick editEmpForm '+ JSON.stringify(editEmpForm));
			//window.editEmpForm = editEmpForm;
			ReactDOM.render(editEmpForm, document.getElementById('empFormContainer'));
			
		}
		
		saveParentTableRef(tableRef) {
			this.state.tableRef = tableRef;
		}
		
		render() {
			var tableRow = null;
			/* this.state = props.jsonState = 
			{
				[{th : {attributes : {scope : 'col'}, data : 'Name'}}, {th : {attributes : {scope : 'col'}, data : 'Age'}}]
			}*/
			var isHeader = false;
			var inputAry = this.state.jsonState;
			var rowCols = [inputAry.length];
			for (var i = 0 ; i < inputAry.length ; i++) {
					if (inputAry[i].hasOwnProperty('th')){
				rowCols[i] = React.createElement('th', inputAry[i].th.attributes, inputAry[i].th.data);
				isHeader = true;
				
			} else if (inputAry[i].hasOwnProperty('td')) {
				var tdProp = inputAry[i].td;
				if (tdProp.hasOwnProperty('anchor')) {
					rowCols[i] = React.createElement('td', {}, React.createElement('a', {hRef: '#', className: 'myAnchor', onClick: this.handleClick}, tdProp.data));
				} else {
					rowCols[i] = React.createElement('td', {}, tdProp.data);
				}
				
			}
			
			
			}
			
			if (isHeader) {
				tableRow = React.createElement('tr', {className: 'table-header'}, rowCols);
			} else {
				tableRow = React.createElement('tr', {}, rowCols);
			}
			
			return tableRow;
		
		}
	
}

class EditEmployeeForm extends React.Component {
	
	  constructor(props) {
            super(props);
			this.state = props.jsonState;//Refer : https://reactjs.org/docs/forms.html
            // Just to see what was passed...
            console.log('EditEmployeeForm: constructor --> got props '+JSON.stringify(props, null, "\t"));
			console.log('EditEmployeeForm: constructor --> got props '+JSON.stringify(this.state, null, "\t"));
			//this.handleOnChange = this.handleOnChange.bind(this);
			//
			this.handleEditEmployeeSubmit = this.handleEditEmployeeSubmit.bind(this);
			//this.closeForm = this.closeForm.bind(this);
			//this.showTable = this.showTable.bind(this);
			
        }
		
		//overriding React.component render's function
        render() {
			console.log('EditEmployeeForm : render entered');
			var titleForm = React.createElement('h6', {className: 'col-md-8'}, React.createElement('font', {color: 'blue'}, 'Edit Employee'));
			//Alias is non editable
			var aliasRow = React.createElement(FormRow, {jsonState: {isMultiColumn: false,  rowData: [{label : {name : 'Alias'}, textInput : {id: 'col1Alias', placeHolder: 'Alias', required: false, disabled: true }}], col1: this.state.alias}, 
														ref: (aliasRow1) => {
														console.log('huha : aliasRow1 ref =' +aliasRow1);window.aliasRow1 = aliasRow1}});
			var orgRow = React.createElement(FormRow, {jsonState: 
															{isMultiColumn: false,  rowData: [{label : {name : 'Organisation'}, 
															select : {id: 'col1Org', placeHolder: 'Organisation', required : true, disabled: true,
															options : ['', 'ABA', 'Katona Systems', 'Hakuna Matata'] }}], col1: this.state.organisation}, 
															ref: (orgRow) => {console.log('huha : orgRow ref =' +orgRow);window.orgRow1 = orgRow}});
			var firstAndLastNameRow = React.createElement(FormRow, {jsonState: 
																		{isMultiColumn: true, 
																		rowData: [{label : {name : 'First name'}, textInput : {id: 'col1FirstName', placeHolder: 'First name', required: false, disabled : true }},
			                                                                      {label : {name : 'Last name'}, textInput : {id: 'col2LastName', placeHolder: 'Last name', required: false, disabled : true }}], col1: this.state.first_name, col2: this.state.last_name},
																		ref: (firstAndLastNameRow) => {console.log('huha : firstAndLastNameRow ref =' +firstAndLastNameRow);window.firstAndLastNameRow1 = firstAndLastNameRow}});
			var addressAndCityRow = React.createElement(FormRow, {jsonState: 
																		{isMultiColumn: true, 
																		rowData: [{label : {name : 'Address'}, textInput : {id: 'col1Address', placeHolder: 'Address', required: false }},
			                                                                      {label : {name : 'City'}, textInput : {id: 'col2City', placeHolder: 'City', required: false }}], col1: this.state.address, col2: this.state.city},
																		ref: (addAndCityRow) => {console.log('huha : addAndCityRow ref =' +addAndCityRow);window.addressAndCityRow1 = addAndCityRow}});
			
			var stateAndCountryRow = React.createElement(FormRow, {jsonState: 
																		{isMultiColumn: true, 
																		rowData: [{label : {name : 'State'}, textInput : {id: 'col1State', placeHolder: 'State', required: false }},
			                                                                      {label : {name : 'Country'}, textInput : {id: 'col2Country', placeHolder: 'Country', required: false }}], col1: this.state.state, col2: this.state.country},
																		ref: (stateAndCountryRef) => {console.log('huha : stateAndCountryRef ref =' +stateAndCountryRef);window.stateAndCountryRow1 = stateAndCountryRef}});
			
			
			var dobAndDojRow = React.createElement(FormRow, {jsonState: 
																		{isMultiColumn: true, 
																		rowData: [{label : {name : 'Date of birth'}, textInput : {id: 'col1Dob', placeHolder: 'Date of birth', required: false }},
			                                                                      {label : {name : 'Date of joining', klass: 'col-md-8 control-label'}, textInput : {id: 'col2Doj', placeHolder: 'Date of joining', required: false }}], col1: this.state.dob, col2: this.state.doj},
																		ref: (dobAndDojRef) => {console.log('huha : dobAndDojRef ref =' +dobAndDojRef);window.dobAndDojRow1 = dobAndDojRef}});
			
			
			var buttonElem = React.createElement('button', {id: "editEmployee", name: "editEmployee", className: "btn btn-lg btn-primary btn-block text-uppercase", type: "submit"}, 'Submit')
			var buttonCol  = React.createElement('div', {className: 'col'}, buttonElem);
			var buttonElem1 = React.createElement('button', {id: "closeEditEmployee", name: "closeEditEmployee", className: "btn btn-lg btn-primary btn-block text-uppercase", type: "submit"}, 'Close')
			var buttonCol1  = React.createElement('div', {className: 'col'}, buttonElem1);
			var buttonRow = React.createElement('div', {className: 'form-group form-row'}, [buttonCol, buttonCol1])
			
	
			//turn [aliasRow, orgRow, firstAndLastNameRow, addAndCityRow, stateAndCountryRow, dobAndDojRow, buttonRow];
			//var windowRefs = {empFormRef : window.editEmpFormRef, aliasRef : window.aliasRow1, orgRef : window.orgRow1, firstAndLastNameRef : window.firstAndLastNameRow1,
			                  // addAndCityRef : window.addressAndCityRow1, stateAndCountryRef : window.stateAndCountryRow1, dobAndDojRef : window.dobAndDojRow1};
			//var form = React.createElement('form', {className: 'well form-horizontal', method: 'post', onSubmit: function(e) { console.log('in editEmpForm submit : windowRefs '+JSON.stringify(windowRefs)); e.preventDefault(); handleFormSubmit(e, windowRefs); }},                   
					//[titleForm, aliasRow, orgRow, firstAndLastNameRow, addressAndCityRow, stateAndCountryRow, dobAndDojRow, buttonRow]);
			var form = React.createElement('form', {className: 'well form-horizontal', method: 'post', onSubmit: this.handleEditEmployeeSubmit} ,                 
					[titleForm, aliasRow, orgRow, firstAndLastNameRow, addressAndCityRow, stateAndCountryRow, dobAndDojRow, buttonRow]);
			console.log('EditEmployeeForm: render : form = '+ form);
	
			 var td = React.createElement('td', {colSpan: "1"}, form);
			 return td;
        }
		
			
		
		handleEditEmployeeSubmit(e) {
		   e.preventDefault();
           console.log('handleEditEmployeeSubmit: entered with target name = ' + e.target.name);
		   console.log('handleEditEmployeeSubmit: window alias ref111 = ' + window.aliasRow1);
		   //destroyComponent(window.editEmpFormRef);
		  
		  //invoke post request through vanilla java script fetch api - https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
		  //fetch API is not supported in all browsers (mostly Safari does not support it, but most browsers do support it )
		   
		    var aliasVal = window.aliasRow1.getComponentValue();
		 
			var orgVal = window.orgRow1.getComponentValue();
			var firstAndLastNameVal = window.firstAndLastNameRow1.getComponentValue();
			console.log('firstAndLastNameVal ' +JSON.stringify(firstAndLastNameVal));
			var addAndCityVal = window.addressAndCityRow1.getComponentValue();
			var stateAndCountryVal = window.stateAndCountryRow1.getComponentValue();
			var dobAndDojVal = window.dobAndDojRow1.getComponentValue();
			
			
			if (aliasVal.hasOwnProperty('col1')) {
				aliasVal = aliasVal.col1;
			} else {
				aliasVal = '';
			}
			
			if (orgVal.hasOwnProperty('col1')) {
				orgVal = orgVal.col1;
			} else {
				orgVal = '';
			}
			
			var firstName = '';
			var lastName = '';
			if (firstAndLastNameVal.hasOwnProperty('col1')) {
				firstName = firstAndLastNameVal.col1;
			} 
			if (firstAndLastNameVal.hasOwnProperty('col2')) {
				lastName = firstAndLastNameVal.col2;
			}
			
			var address = '';
			var city = '';
			if (addAndCityVal.hasOwnProperty('col1')) {
				address = addAndCityVal.col1;
			}  if (addAndCityVal.hasOwnProperty('col2')) {
				city = addAndCityVal.col2;
			}
			
			var state = '';
			var country = '';
			if (stateAndCountryVal.hasOwnProperty('col1')) {
				state = stateAndCountryVal.col1;
			}  if (stateAndCountryVal.hasOwnProperty('col2')) {
				country = stateAndCountryVal.col2;
			}
			
			var dob = '';
			var doj = '';
			if (dobAndDojVal.hasOwnProperty('col1') && dobAndDojVal.col1 != null) {
				dob = dobAndDojVal.col1;
			} 
			if (dobAndDojVal.hasOwnProperty('col2') && dobAndDojVal.col2 != null) {
				doj = dobAndDojVal.col2;
			}
			
			
			var postData = {
					
			};
			
		 var postData = {
				 'alias' :aliasVal,
			     'org': orgVal,
				 'firstName' : firstName,
				 'lastName' : lastName,
				 'address': address,
				 'city': city,
				 'state': state,
				 'country': country,
				 'dob': dob,
				 'doj': doj
				 
			
			}; 
			
			console.log('About to invoke backend action with postData '+JSON.stringify(postData));
			axios({
				method: 'post',
				url: '/hrms/edit/employee',
				data: postData
			})
			
			/** 
				An arrow function expression is a syntactically compact alternative to a regular function expression,
				although without its own bindings to the this, arguments, super, or new.target keywords.
				Refer : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions	**/
			.then(response => {
			console.log('callback success '+response);
			destroyComponent(window.editEmpFormRef);
			showSuccessMsg(response.data.msg);
	       })
			.catch(error => {
				console.log(error);
				var response = error.response//axios adds these fields in response
				showFailureMsg(response.data.msg);
				
			});
			
			
			
			
		}
}

//common utility functions

	function destroyComponent(compRef) {
			 let mountNode = ReactDOM.findDOMNode(compRef).parentNode;
 
			try {
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
		}
		
		function showSuccessMsg(msg) {
			console.log('showSuccessMsg11: entered with '+msg);
			var sucMsg = React.createElement(SucessMsg, {msg: msg, ref: (elem1) => {console.log('huha : elem1 =' +elem1);window.successMsgComp = elem1}}, null);
			var successMsgElem = ReactDOM.render(sucMsg, document.getElementById('msgDiv'));
			setTimeout(function () {
				console.log('showSuccessMsg: timeout expired');
 
			try {
				    //working solution 1
					//let mountNode = window.successMsg.getParentDomRef();
					//working solution 2
					//let mountNode = successMsgElem.getParentDomRef();
					//working solution 3
					//Ref : https://reactjs.org/docs/react-dom.html#render
					let mountNode = window.successMsgComp.getParentDomRef();
					
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
			}, 1000);
		}

		function showFailureMsg(msg) {
			console.log('showFailureMsg: entered with '+msg);
			var errorMsg = React.createElement(FailureMsg, {msg: msg, ref: (elem1) => {console.log('huha : elem1 =' +elem1);window.errorMsgComp = elem1}}, null);
			var errorMsgElem = ReactDOM.render(errorMsg, document.getElementById('msgDiv'));
			setTimeout(function () {
				console.log('showFailureMsg: timeout expired');
 
			try {
				    //working solution 1
					//let mountNode = window.successMsg.getParentDomRef();
					//working solution 2
					//let mountNode = successMsgElem.getParentDomRef();
					//working solution 3
					//Ref : https://reactjs.org/docs/react-dom.html#render
					let mountNode = ReactDOM.findDOMNode(window.errorMsgComp).parentNode;
					
					
					ReactDOM.unmountComponentAtNode(mountNode);
				} catch (e) {
					console.error(e);
				}
			}, 1000);
		}
		/** */
		function handleFormSubmit(e, windowRefs) {
			
		  console.log('handleFormSubmit: entered with target name = ' + e.target.name + ', windowRefs = '+windowRefs);
		  if (windowRefs.hasOwnProperty('empFormRef')) {
			  alert('heyeaaa '+windowRefs.empFormRef);
		  }
		   destroyComponent(windowRefs.empFormRef);
		  
		  //invoke post request through vanilla java script fetch api - https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
		  //fetch API is not supported in all browsers (mostly Safari does not support it, but most browsers do support it )
		   
		    var aliasVal = windowRefs.aliasRef.getComponentValue();
			var orgVal = windowRefs.orgRef.getComponentValue();
			var firstAndLastNameVal = window.firstAndLastNameRow.getComponentValue();
			var addAndCityVal = window.addressAndCityRow.getComponentValue();
			var stateAndCountryVal = window.stateAndCountryRow.getComponentValue();
			var dobAndDojVal = window.dobAndDojRow.getComponentValue();
			console.log('handleSubmit: dobAndDojVal = '+ JSON.stringify(dobAndDojVal) );
			
			
			if (aliasVal.hasOwnProperty('col1')) {
				aliasVal = aliasVal.col1;
			} else {
				aliasVal = '';
			}
			
			if (orgVal.hasOwnProperty('col1')) {
				orgVal = orgVal.col1;
			} else {
				orgVal = '';
			}
			
			var firstName = '';
			var lastName = '';
			if (firstAndLastNameVal.hasOwnProperty('col1')) {
				firstName = firstAndLastNameVal.col1;
			} else if (firstAndLastNameVal.hasOwnProperty('col2')) {
				lastName = firstAndLastNameVal.col2;
			}
			
			var address = '';
			var city = '';
			if (addAndCityVal.hasOwnProperty('col1')) {
				address = addAndCityVal.col1;
			} else if (addAndCityVal.hasOwnProperty('col2')) {
				city = addAndCityVal.col2;
			}
			
			var state = '';
			var country = '';
			if (stateAndCountryVal.hasOwnProperty('col1')) {
				state = stateAndCountryVal.col1;
			} else if (stateAndCountryVal.hasOwnProperty('col2')) {
				country = stateAndCountryVal.col2;
			}
			
			var dob = '';
			var doj = '';
			if (dobAndDojVal.hasOwnProperty('col1')) {
				dob = dobAndDojVal.col1;
			} else if (dobAndDojVal.hasOwnProperty('col2')) {
				doj = dobAndDojVal.col2;
			}
			
			
			var postData = {
					
			};
			
		 var postData = {
				 'alias' :aliasVal,
			     'org': orgVal,
				 'firstName' : firstName,
				 'lastName' : lastName,
				 'address': address,
				 'city': city,
				 'state': state,
				 'country': country,
				 'dob': dob,
				 'doj': doj
				 
			
			}; 
			
			console.log('About to invoke backend action');
			axios({
				method: 'post',
				url: '/hrms/edit/employee',
				data: postData
			})
			
			/** 
				An arrow function expression is a syntactically compact alternative to a regular function expression,
				although without its own bindings to the this, arguments, super, or new.target keywords.
				Refer : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions	**/
			.then(response => {
			console.log('callback success '+response);
			showSuccessMsg(response.data.msg);
	       })
			.catch(error => {
				console.log(error);
				var response = error.response//axios adds these fields in response
				showFailureMsg(response.data.msg);
				
			});
			
			
		}
		
	



