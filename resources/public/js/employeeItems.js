/**
This is demonstrating use of React without React provided JSX. If you use JSX, then the type in the referring html's
script tag has also to be mentioned as "script/jsx". Reason to not use JSX is that I can not build JSX only the browser
alone. To use JSX, you need to use special npm based Babel JSX compiler.Can not do it in my case, where all I have is Clojure at backend.
Basically, you need npm at the backend to write React code with JSX, which I do not have/want to have.

*/

//http://www.reactjstutorial.net/props.html
//https://codeburst.io/react-state-vs-props-explained-51beebd73b21


function generateAddEmployeeForm() {
	
	
	form = React.createElement(EmployeeForm, {formClass: 'well form-horizontal', 
									 jsonState: {alias: '', org: '', firstName: '', lastName: '', address: '', city: '', state1: '', country: '', dob: '', doj: '', dobPicker: null, dojPicker: null} //the initial states of all form input fields
									 }, null)
	ReactDOM.render(
	  form,
	  document.getElementById('empFormContainer')
	);
}
	
handleCreateEmployeeClick = function (e) {
	console.log('handleCreateEmployeeClick: entered');
	generateAddEmployeeForm();
	
	
}

function generateEditEmployeeForm() {
	

	form = React.createElement(SearchEmployeeForm, {formClass: 'well form-horizontal', showProgressLoader: false //the initial states of all form input fields
									 }, null)
	ReactDOM.render(
	  form,
	  document.getElementById('empFormContainer')
	);
}
handleEditEmployeeClick = function (e) {
	console.log('handleEditEmployeeClick: entered');
	generateEditEmployeeForm();
}

var menuElem1 = React.createElement(MenuItem, {menuName: "Create Profile", handleClick: handleCreateEmployeeClick}, null);
var menuElem2 = React.createElement(MenuItem, {menuName: "Edit Profile", handleClick: handleEditEmployeeClick}, null);

var menuItemContainerDiv = React.createElement('div', {id: 'menuItemContainer'}, [menuElem1, menuElem2]);

ReactDOM.render(
  menuItemContainerDiv,
  document.getElementById('employeeMenuItems')
);