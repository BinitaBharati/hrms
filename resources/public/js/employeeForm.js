/**
This is demonstarting use of React without React provided JSX. If you use JSX, then the type in the referring html's
script tag has also to be mentioned as "script/jsx". I could not get vanilla javascript APIs to work with JSX.So, you
can not use document.cookies, alert etc with JSX.
*/



//Need to generate Bootstrap form template.
//First name
var labelElem = React.createElement('Label', {labelFor: 'firstName', labelText: 'First Name'}, null);
var inputElem = React.createElement('Input', {type: 'text', klass: 'form-control', id: 'firstName', placeHolder: 'Enter the first name'}, null);
var formElem = React.createElement('div', {className: 'form-group col-md-6'}, [labelElem, inputElem]);
var formRow =  React.createElement('div', {className: 'form-row'}, [formElem]);
//Last name
var labelElem1 = React.createElement('Label', {labelFor: 'lastName', labelText: 'Last Name'}, null);
var inputElem1 = React.createElement('Input', {type: 'text', klass: 'form-control', id: 'lastName', placeHolder: 'Enter the last name'}, null);
var formElem11 = React.createElement('div', {className: 'form-group col-md-6'}, [labelElem1, inputElem1]);
var formRow1 =  React.createElement('div', {className: 'form-row'}, [formElem1]);
//Alias
var labelElem2 = React.createElement('Label', {labelFor: 'alias', labelText: 'Alias'}, null);
var inputElem2 = React.createElement('Input', {type: 'text', klass: 'form-control', id: 'alias', placeHolder: 'Enter the alias'}, null);
var formElem2 = React.createElement('div', {className: 'form-group'}, [labelElem2, inputElem2]);
var formRow2 =  React.createElement('div', {className: 'form-row'}, [formElem2]);
//Organisation
//Alias
var labelElem3 = React.createElement('Label', {labelFor: 'org', labelText: 'Organisation'}, null);
var inputElem3 = React.createElement('Input', {type: 'text', klass: 'form-control', id: 'alias', placeHolder: 'Enter the organisation'}, null);
var formElem3 = React.createElement('div', {className: 'form-group'}, [labelElem3, inputElem3]);
var formRow3 =  React.createElement('div', {className: 'form-row'}, [formElem3]);

var form = React.createElement('form', {} , [formRow, formRow1, formRow2, formRow3]);

ReactDOM.render(
  form,
  document.getElementById('main-body')
);
  