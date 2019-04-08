/**
This is demonstarting use of React without React provided JSX. If you use JSX, then the type in the referring html's
script tag has also to be mentioned as "script/jsx". I could not get vanilla javascript APIs to work with JSX.So, you
can not use document.cookies, alert etc with JSX.
*/

cookie = decodeURIComponent(document.cookie);//decodeURIComponent is from vanilla java script itself
userProfile = cookie.substring( cookie.indexOf("userCreds=") + "userCreds=".length )
firstNameStartIdx = userProfile.indexOf("firstName=");
firstName = userProfile.substring(firstNameStartIdx + "firstName=".length, userProfile.indexOf(";", firstNameStartIdx));
lastNameStartIdx = userProfile.indexOf("lastName=");
lastName = userProfile.substring(lastNameStartIdx + "lastName=".length);
//alert("firstName = " +firstName);

//Refer : https://reactjs.org/tutorial/tutorial.html
childElemAry = [React.createElement('span', null, React.createElement('img', {src: '/images/user.jpg'}, null)),
				React.createElement('strong', null, firstName + " " + lastName)];
anchorElem = React.createElement('a', {href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown'}, 
                    //child span element
					childElemAry
					);
					
ulElem = React.createElement('ul', {className: 'dropdown-menu'}, //Note:  React.createElement props key name may not match exactly with the generated html counterpart.Eg: html class attribute is className in React property.
							//single ul child
							React.createElement('li', null,
							//single li child
							React.createElement('div', {className: 'navbar-login'},
							//single child of div
							React.createElement('div', {className: 'row'},
							//single child of div
							React.createElement('div', {className: 'col-lg-12'},
							//single child of div
							React.createElement('p', null,
							//single child of p
							React.createElement('a', {style: {borderRadius: '.25rem',textAlign: 'center',textDecoration: 'none'}, href: '/hrms/logout/', className: 'btn-primary btn-block'}, 'Logout'))
							)))));
							
userProfDivChildElemAry = [anchorElem, ulElem];
const userProfileElem = React.createElement('li', {className: 'dropdown'}, 
                    //child span element
					userProfDivChildElemAry
					);
ReactDOM.render(userProfileElem, document.getElementById('nav-user-profile'));