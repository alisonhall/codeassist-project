import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';
import firebase from 'firebase';
// import firebaseApp from 'firebase/app';
// import firebaseAuth from 'firebase/auth';
// import database from 'firebase/database';
// var gcloud = require('google-cloud');
// var gcs = gcloud.storage();
// var bucket = gcs.bucket('code-assist.appspot.com');
// import base from './../../base.js';
// import app from './../../base.js';

var Rebase = require('re-base');

var base = Rebase.createClass({
	apiKey: "AIzaSyAnEDbmWbdr72O2IeCY1Qicj3c4LLkL9cU",
	authDomain: "code-assist.firebaseapp.com",
	databaseURL: "https://code-assist.firebaseio.com",
	storageBucket: "code-assist.appspot.com"
});



// Components
import About from './../About/About.js';
import Accordion from './../Accordion/Accordion.js';
import CategoriesSidebar from './../CategoriesSidebar/CategoriesSidebar.js';
import CategoryInfo from './../CategoryInfo/CategoryInfo.js';
import CreateCategory from './../CreateCategory/CreateCategory.js';
import CreateSnippet from './../CreateSnippet/CreateSnippet.js';
import EditMenu from './../EditMenu/EditMenu.js';
import ExampleCards from './../ExampleCards/ExampleCards.js';
import Examples from './../Examples/Examples.js';
import Footer from './../Footer/Footer.js';
import Header from './../Header/Header.js';
import Home from './../Home/Home.js';
import Languages from './../Languages/Languages.js';
import Login from './../Login/Login.js';
import NoContent from './../NoContent/NoContent.js';
import NoLanguage from './../NoLanguage/NoLanguage.js';
import OpenExampleCard from './../OpenExampleCard/OpenExampleCard.js';
// import Page from './../Page/Page.js';
import SearchResults from './../SearchResults/SearchResults.js';
import UserSettings from './../UserSettings/UserSettings.js';

// Styles
import './page.scss';


class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryDataLoaded: false,
			languageDataLoaded: false,
			exampleDataLoaded: false,
			userDataLoaded: false,
			commentDataLoaded: false,
			allDataLoaded: false,
			topCategoryDataLoaded: false,
			selectedLanguagesDataLoaded: false,
			currentUserDataLoaded: false,

			allCategories: [],
			allLanguages: [],
			allExamples: [],
			allUsers: [],
			allComments: [],
			
			topCategories: [],
			selectedLanguages: [],

			contentComponent: '',
			currentUser: []
		};

		this.addToSelectedLanguages = this.addToSelectedLanguages.bind(this);
		this.removeSelectedLanguage = this.removeSelectedLanguage.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.addExample = this.addExample.bind(this);
		this.editCategory = this.editCategory.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);
		this.editExample = this.editExample.bind(this);
		this.deleteExample = this.deleteExample.bind(this);
		this.restoreExample = this.restoreExample.bind(this);

		this.addRelatedCategory = this.addRelatedCategory.bind(this);
		this.removeRelatedCategory = this.removeRelatedCategory.bind(this);
		this.removeRelatedCategory2 = this.removeRelatedCategory2.bind(this);
		this.checkRelatedCategories = this.checkRelatedCategories.bind(this);
		this.addToTopCategories = this.addToTopCategories.bind(this);
		this.removeFromTopCategories = this.removeFromTopCategories.bind(this);
		this.removeFromParentCategory = this.removeFromParentCategory.bind(this);
		this.addToParentCategory = this.addToParentCategory.bind(this);
		this.checkParentCategory = this.checkParentCategory.bind(this);
		this.removeExampleFromOldLocation = this.removeExampleFromOldLocation.bind(this);
		this.addExampleToNewLocation = this.addExampleToNewLocation.bind(this);

		this.getInitialData = this.getInitialData.bind(this);
		this.setupSyncState = this.setupSyncState.bind(this);

		this.refCategories;
		this.refTopCategories;
		this.refComments;
		this.refExamples;
		this.refLanguages2;
		this.refSelectedLanguages;
		this.refUsers;
		this.refCurrentUser;
	}

	getInitialData() {
		var numFetches = 0;
		var totalFetches = 8;
		var noErrors = true;

		base.fetch('categories', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				allCategories: data,
				categoryDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('topCategories', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				topCategories: data,
				topCategoryDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('comments', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				allComments: data,
				commentDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('examples', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				allExamples: data,
				exampleDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('languages2', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				allLanguages: data,
				languageDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('selectedLanguages', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				selectedLanguages: data,
				selectedLanguagesDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('users', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				allUsers: data,
				userDataLoaded: true,
				allDataLoaded: allDataLoaded
			})
		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		base.fetch('currentUser', {
			context: this,
			asArray: true
		}).then(data => {
			// console.log(data);
			numFetches++;
			var allDataLoaded = (numFetches == totalFetches && noErrors) ? true : false;
			this.setState({
				currentUser: data,
				currentUserDataLoaded: true,
				allDataLoaded: allDataLoaded
			})

			// console.log("Data Loaded: ", this.state);

		}).catch(error => {
			//handle error
			noErrors = false;
			console.log("Firebase Fetch ERROR: " + error);
		});

		// if(numFetches == totalFetches && noErrors) {
		// 	this.setState({allDataLoaded: true});
		// }

	}

	setupSyncState() {
		this.refCategories = base.syncState('categories', {
			context: this,
			state: 'allCategories',
			asArray: true,
			// then: this.setState({categoryDataLoaded: true})
		});
		this.refTopCategories = base.syncState('topCategories', {
			context: this,
			state: 'topCategories',
			asArray: true,
			// then: this.setState({topCategoryDataLoaded: true})
		});
		this.refComments = base.syncState('comments', {
			context: this,
			state: 'allComments',
			asArray: true,
			// then: this.setState({commentDataLoaded: true})
		});
		this.refExamples = base.syncState('examples', {
			context: this,
			state: 'allExamples',
			asArray: true,
			// then: this.setState({exampleDataLoaded: true})
		});
		this.refLanguages2 = base.syncState('languages2', {
			context: this,
			state: 'allLanguages',
			asArray: true,
			// then: this.setState({languageDataLoaded: true})
		});
		this.refSelectedLanguages = base.syncState('selectedLanguages', {
			context: this,
			state: 'selectedLanguages',
			asArray: true,
			// then: this.setState({selectedLanguagesDataLoaded: true})
		});
		this.refUsers = base.syncState('users', {
			context: this,
			state: 'allUsers',
			asArray: true,
			// then: this.setState({userDataLoaded: true})
		});
		this.refCurrentUser = base.syncState('currentUser', {
			context: this,
			state: 'currentUser',
			asArray: true,
			// then: this.setState({currentUserDataLoaded: true})
		});
	}

	componentWillMount() {
		// this runs right before the <Page> is rendered
		console.log("Loading data...");
		
		this.getInitialData();
		this.setupSyncState();

		// if(categoryDataLoaded && topCategoryDataLoaded && commentDataLoaded && exampleDataLoaded && languageDataLoaded && selectedLanguagesDataLoaded && userDataLoaded) {
		// 	this.setState({ allDataLoaded: true });
		// 	console.log("componentWillMount() END");
		// }

		// console.log(this.refCategories);

		// check if there is any order in localStorage
		// const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		// if (localStorageRef) {
		// 	// update our App component's order state
		// 	this.setState({
		// 		order: JSON.parse(localStorageRef)
		// 	});
		// }

	}

	componentWillUnmount() {
		base.removeBinding(this.refCategories);
		base.removeBinding(this.refTopCategories);
		base.removeBinding(this.refComments);
		base.removeBinding(this.refExamples);
		base.removeBinding(this.refLanguages2);
		base.removeBinding(this.refSelectedLanguages);
		base.removeBinding(this.refUsers);
		base.removeBinding(this.refCurrentUser);
	}

	addToSelectedLanguages(key) {
		// console.log(this.state);
		console.log("Select language " + key);
		var selectedLanguages = this.state.selectedLanguages;
		if (selectedLanguages.length >= 3) {
			alert("You can't add more than 3 languages.");
		} else {
			selectedLanguages.push(key);
			this.setState({ selectedLanguages: selectedLanguages });
		}
	}

	removeSelectedLanguage(key) {
		// console.log(this.state);
		console.log("Remove language " + key);
		var selectedLanguages = this.state.selectedLanguages;
		selectedLanguages.splice(key, 1);
		this.setState({ selectedLanguages: selectedLanguages });
	}

	addRelatedCategory(newCategoryId, relatedCategoryId) {
		console.log("addRelatedCategory newCategoryId:", newCategoryId, " relatedCategoryId:", relatedCategoryId);
		var allCategories = this.state.allCategories;

		console.log("allCategories[relatedCategoryId].relatedCategoryIDs", allCategories[relatedCategoryId].relatedCategoryIDs);
		if(allCategories[relatedCategoryId].relatedCategoryIDs && allCategories[relatedCategoryId].relatedCategoryIDs !== 'None') {
			allCategories[relatedCategoryId].relatedCategoryIDs.push(newCategoryId);
		} else {
			allCategories[relatedCategoryId]["relatedCategoryIDs"] = [newCategoryId];
		}

		this.setState({allCategories: allCategories});
	}

	removeRelatedCategory(originalCategory, categoryId) {
		var categoryId = Number(categoryId);
		var originalCategory = Number(originalCategory);
		console.log("removeRelatedCategory. Remove categoryId(", categoryId, ") from category originalCategory(", originalCategory, ")");
		var allCategories = this.state.allCategories;

		// console.log("allCategories[categoryId].relatedCategoryIDs.length", allCategories[categoryId].relatedCategoryIDs.length)
		if(allCategories[originalCategory].relatedCategoryIDs.length > 0) {
			var index = allCategories[originalCategory].relatedCategoryIDs.indexOf(categoryId);
			// console.log("allCategories[categoryId].relatedCategoryIDs", allCategories[categoryId].relatedCategoryIDs, "Number(originalCategory)", Number(originalCategory), "index", index);
			if (index > -1) {
			    // console.log("removeRelatedCategory SPLICE");
			    allCategories[originalCategory].relatedCategoryIDs.splice(index, 1);
			}
		} else {
			allCategories[originalCategory].relatedCategoryIDs = 'None';
		}

		console.log("After removal: allCategories[originalCategory].relatedCategoryIDs", allCategories[originalCategory].relatedCategoryIDs);
		
		this.setState({allCategories: allCategories});
	}

	removeRelatedCategory2(categoryId, originalCategory) {
		var categoryId = Number(categoryId);
		var originalCategory = Number(originalCategory);
		console.log("removeRelatedCategory. Remove categoryId(", categoryId, ") from category originalCategory(", originalCategory, ")");
		var allCategories = this.state.allCategories;

		// console.log("allCategories[categoryId].relatedCategoryIDs.length", allCategories[categoryId].relatedCategoryIDs.length)
		if(allCategories[originalCategory].relatedCategoryIDs.length > 0) {
			var index = allCategories[originalCategory].relatedCategoryIDs.indexOf(categoryId);
			// console.log("allCategories[categoryId].relatedCategoryIDs", allCategories[categoryId].relatedCategoryIDs, "Number(originalCategory)", Number(originalCategory), "index", index);
			if (index > -1) {
			    // console.log("removeRelatedCategory SPLICE");
			    allCategories[originalCategory].relatedCategoryIDs.splice(index, 1);
			}
		} else {
			allCategories[originalCategory].relatedCategoryIDs = 'None';
		}

		console.log("After removal: allCategories[originalCategory].relatedCategoryIDs", allCategories[originalCategory].relatedCategoryIDs);
		
		this.setState({allCategories: allCategories});
	}

	checkRelatedCategories(originalIds, newIds, categoryId) {
		console.log("checkRelatedCategories originalIds:", originalIds, " newIds:", newIds, " categoryId:", categoryId);
		var allCategories = this.state.allCategories;

		if(newIds == 'None') {
			originalIds.map(this.removeRelatedCategory2.bind(this, categoryId));
			// allCategories[categoryId].relatedCategoryIDs.map(this.removeRelatedCategory.bind(this, categoryId));

		} else if (originalIds == 'None') {
			newIds.map(this.addRelatedCategory.bind(this, categoryId));
		} else {
			for (var i = 0; i < newIds.length; i++) {
				console.log("Loop 1. i", i, " newIds[i]", newIds[i]);

				var index = originalIds.indexOf(newIds[i]);
				if (index > -1) {
				    console.log("No change. In both: newIds[i]", newIds[i], " originalIds[index]", originalIds[index], " i", i, " index", index);
				} else {
					console.log("Add: newIds[i]", newIds[i], " originalIds[index]", originalIds[index], " i", i, " index", index);
					// this.addRelatedCategory(newCategoryId, relatedCategoryId);
					// this.addRelatedCategory(newIds[i], originalIds);
					// addRelatedCategory(newCategoryId, relatedCategoryId)

					this.addRelatedCategory(categoryId, newIds[i]);
				}
			}

			for (var j = 0; j < originalIds.length; j++) {
				console.log("Loop 2. j", j, " originalIds[j]", originalIds[j]);

				var index2 = newIds.indexOf(originalIds[j]);
				if (index2 > -1) {
					console.log("No change. In both: originalIds[j]", originalIds[j], " newIds[index]", newIds[index], " i", i, " index", index);
				} else {
					console.log("Remove: originalIds[j]", originalIds[j], " newIds[index2]", newIds[index2], " j", j, " index2", index2);
					// this.removeRelatedCategory(categoryId, index);
					// this.removeRelatedCategory(originalIds[j], originalIds);
					this.removeRelatedCategory(originalIds[j], categoryId);
				}
			}
		}
		
	}

	addToTopCategories(categoryId) {
		console.log("addToTopCategories categoryId:", categoryId);
		var topCategories = this.state.topCategories;
		topCategories.push(`${categoryId}`);
		this.setState({ topCategories: topCategories });
	}

	removeFromTopCategories(categoryId) {
		console.log("removeFromTopCategories categoryId:", categoryId);
		var topCategories = this.state.topCategories;
		var index = topCategories.indexOf(categoryId);
		if (index > -1) {
		    topCategories.splice(index, 1);
		}
		this.setState({ topCategories: topCategories });
	}

	removeFromParentCategory(parentCategoryId, categoryId) {
		console.log("removeFromParentCategory parentCategoryId:", parentCategoryId, " categoryId:", categoryId);
		var allCategories = this.state.allCategories;

		if(allCategories[parentCategoryId].subCategoryIDs.length > 1) {
			var index = allCategories[parentCategoryId].subCategoryIDs.indexOf(categoryId);
			if (index > -1) {
			    allCategories[parentCategoryId].subCategoryIDs.splice(index, 1);
			}
		} else {
			var index = allCategories[parentCategoryId].subCategoryIDs.indexOf(categoryId);
			if (index > -1) {
				allCategories[parentCategoryId].subCategoryIDs = 'None';
			}
		}

		this.setState({ allCategories: allCategories });
	}

	addToParentCategory(parentCategoryId, categoryId) {
		console.log("addToParentCategory parentCategoryId:", parentCategoryId, " categoryId:", categoryId);
		var allCategories = this.state.allCategories;

		if(allCategories[parentCategoryId].subCategoryIDs && allCategories[parentCategoryId].subCategoryIDs !== 'None') {
			allCategories[parentCategoryId].subCategoryIDs.push(`${categoryId}`);
		} else {
			allCategories[parentCategoryId].subCategoryIDs = [`${categoryId}`];
		}
	}

	checkParentCategory(categoryId, originalParentCategory, newParentCategory) {
		console.log("checkParentCategory categoryId:", categoryId, " originalParentCategory:", originalParentCategory, " newParentCategory:", newParentCategory);

		if(originalParentCategory !== newParentCategory) {
			console.log("Edit Category: Different parent category");
			if(originalParentCategory == 'None') {
				console.log("Edit Category: Remove from topCategories, change it's parent's subCategoryIDs");
				this.removeFromTopCategories(categoryId);
			    this.addToParentCategory(newParentCategory, categoryId);

			} else if (newParentCategory == 'None') {
				console.log("Edit Category: Add to topCategories, change it's parent's subCategoryIDs");
				this.addToTopCategories(categoryId);
				this.removeFromParentCategory(originalParentCategory, categoryId);

			} else {
				console.log("Edit Category: Just change it's parent's subCategoryIDs");
				this.removeFromParentCategory(originalParentCategory, categoryId);
				this.addToParentCategory(newParentCategory, categoryId);
			}
		} else {
			console.log("Edit Category: Same parent category, do nothing");
		}

	}

	addCategory(object, index, selectedParentCategory, isTopLevel, relatedCategoryIDs) {
		console.log("Add category to " + selectedParentCategory);
		console.log("\tfunction attributes:", object, index, selectedParentCategory, isTopLevel, relatedCategoryIDs);
		var allCategories = this.state.allCategories;

		if(isTopLevel) {
			// topCategories.push(`${index}`);
			this.addToTopCategories(index);
				
		} else {
			this.addToParentCategory(selectedParentCategory, index);
		}

		if(relatedCategoryIDs !== 'None') {
			relatedCategoryIDs.map(this.addRelatedCategory.bind(this, index));
		} else {
			// this.addRelatedCategory(this, index);
		}
		
		allCategories[index] = object;

		this.setState({ allCategories: allCategories });
	}

	deleteCategory(categoryId) {
		console.log("Delete Category " + categoryId);
		var allCategories = this.state.allCategories;

		if(allCategories[categoryId].isTopLevel) {
			this.removeFromTopCategories(categoryId);
		} else {
			var parentCategory = allCategories[categoryId].parentCategory;
			this.removeFromParentCategory(parentCategory, categoryId);
		}

		if(allCategories[categoryId].relatedCategoryIDs !== 'None') {
			allCategories[categoryId].relatedCategoryIDs.map(this.removeRelatedCategory.bind(this, categoryId));
		}

		allCategories[categoryId] = null;

		this.setState({ allCategories: allCategories });
	}

	editCategory(object, categoryId, originalParentCategory, newParentCategory) {
		console.log("Editing Category " + categoryId);
		console.log(object, categoryId, originalParentCategory, newParentCategory);
		var originalRelatedCategories = this.state.allCategories[categoryId].relatedCategoryIDs;
		var allCategories = this.state.allCategories;

		this.checkParentCategory(categoryId, originalParentCategory, newParentCategory);

		console.log("Before Edit Saving ", allCategories[categoryId]);
		allCategories[categoryId] = { ...object };

		// console.log("Edit RelatedCategoryIDs originalRelatedCategories:", originalRelatedCategories, " allCategories[categoryId].relatedCategoryIDs:", allCategories[categoryId].relatedCategoryIDs);
		if(originalRelatedCategories !== allCategories[categoryId].relatedCategoryIDs) {
			console.log("Edit RelatedCategoryIDs: Change related categories");
			this.checkRelatedCategories(originalRelatedCategories, allCategories[categoryId].relatedCategoryIDs, categoryId);
		} else {
			console.log("Edit RelatedCategoryIDs: Do nothing");
		}

		this.setState({ allCategories: allCategories });
		console.log("After Edit Saving ", allCategories[categoryId]);
	}

	addExample(object, index, category, language, isSyntax) {
		console.log("Add example to " + category);
		console.log(object, index, category, language, isSyntax);
		var allExamples = this.state.allExamples;
		var allCategories = this.state.allCategories;

		var type = (isSyntax) ? 'syntaxes' : 'examples';
		var numTypes = 0;



		if(allCategories[category].count) {
			if(allCategories[category].count[language]) {
				if(allCategories[category].count[language][type]) {
					numTypes = allCategories[category].count[language][type].length + 1;
					allCategories[category].count[language][type][numTypes] = index;
				} else {
					var syntaxes = (allCategories[category]["count"][language]["syntaxes"]) ? allCategories[category]["count"][language]["syntaxes"] : [];
					var examples = (allCategories[category]["count"][language]["examples"]) ? allCategories[category]["count"][language]["examples"] : [];
					
					if(type == 'syntaxes') {
						allCategories[category]["count"][language] = {
							// ["syntaxes"]: syntaxes,
							["examples"]: examples,
							[type]: {
								[0]: index
							},
						}
					} else if (type == 'examples') {
						allCategories[category]["count"][language] = {
							// ["examples"]: examples,
							["syntaxes"]: syntaxes,
							[type]: {
								[0]: index
							},
						}
					} else {
						console.log("ERROR: unknown type in allCategories[category][count][language]");
					}
				}
			} else {
				var totalNumLanguages = this.state.allLanguages.length;

				var countObjects = [];

				for (var i = 0; i < this.state.allLanguages.length; i++) {
					var languageObject = (allCategories[category]["count"][i]) ? allCategories[category]["count"][i] : {};

					if (language == i) {
						countObjects.push({
							[type]: {
								[0]: index
							}
						});
					} else {
						countObjects.push(languageObject);
					}
					
				}

				allCategories[category]["count"] = { ...countObjects };
			}
		} else {
			var id = allCategories[category].id;
			var key = (allCategories[category].key) ? allCategories[category].key : '';
			var subCategoryIDs = (allCategories[category].subCategoryIDs) ? allCategories[category].subCategoryIDs : [];
			var relatedCategories = (allCategories[category].relatedCategories) ? allCategories[category].relatedCategories : [];
			var isTopLevel = (allCategories[category].isTopLevel) ? allCategories[category].isTopLevel : null;
			var name = (allCategories[category].name) ? allCategories[category].name : '';
			var alternativeNames = (allCategories[category].alternativeNames) ? allCategories[category].alternativeNames : [];
			var description = (allCategories[category].description) ? allCategories[category].description : '';
			var dateCreated = (allCategories[category].dateCreated) ? allCategories[category].dateCreated : '';
			var dateEdited = (allCategories[category].dateEdited) ? allCategories[category].dateEdited : '';
			var editedBy = (allCategories[category].editedBy) ? allCategories[category].editedBy : '';
			var createdBy = (allCategories[category].createdBy) ? allCategories[category].createdBy : '';
			var parentCategory = (allCategories[category].parentCategory) ? allCategories[category].parentCategory : '';

			allCategories[category] = {
				["count"]: {
					[language]: {
						[type]: {
							[0]: index
						}
					}
				},
				id,
				key,
				subCategoryIDs,
				relatedCategories,
				isTopLevel,
				name,
				alternativeNames,
				description,
				dateCreated,
				dateEdited,
				editedBy,
				createdBy,
				parentCategory
			}
		}
		
		allExamples[index] = object;

		this.setState({ allCategories: allCategories, allExamples: allExamples });
	}

	removeExampleFromOldLocation(exampleId, category, language, type) {
		console.log("removeExampleFromOldLocation", exampleId, category, language, type);
		var allCategories = this.state.allCategories;

		var index = allCategories[category]["count"][language][type].indexOf(exampleId);
		if (index > -1) {
		    allCategories[category]["count"][language][type].splice(index, 1);
		}
		
		this.setState({ allCategories: allCategories });
	}

	addExampleToNewLocation(exampleId, category, language, type) {
		console.log("addExampleToNewLocation", exampleId, category, language, type);
		var allCategories = this.state.allCategories;

		if(allCategories[category].count) {
			if(allCategories[category].count[language]) {
				if(allCategories[category].count[language][type]) {
					allCategories[category].count[language][type].push(exampleId);
				} else {
					var syntaxes = (allCategories[category]["count"][language]["syntaxes"]) ? allCategories[category]["count"][language]["syntaxes"] : [];
					var examples = (allCategories[category]["count"][language]["examples"]) ? allCategories[category]["count"][language]["examples"] : [];
					
					if(type == 'syntaxes') {
						allCategories[category]["count"][language] = {
							// ["syntaxes"]: syntaxes,
							["examples"]: examples,
							[type]: {
								[0]: exampleId
							},
						}
					} else if (type == 'examples') {
						allCategories[category]["count"][language] = {
							// ["examples"]: examples,
							["syntaxes"]: syntaxes,
							[type]: {
								[0]: exampleId
							},
						}
					} else {
						console.log("ERROR: unknown type in allCategories[category][count][language]");
					}
				}
			} else {
				var totalNumLanguages = this.state.allLanguages.length;

				var countObjects = [];

				for (var i = 0; i < this.state.allLanguages.length; i++) {
					var languageObject = (allCategories[category]["count"][i]) ? allCategories[category]["count"][i] : {};

					if (language == i) {
						countObjects.push({
							[type]: {
								[0]: exampleId
							}
						});
					} else {
						countObjects.push(languageObject);
					}
					
				}

				allCategories[category]["count"] = { ...countObjects };
			}
		} else {
			var id = allCategories[category].id;
			var key = (allCategories[category].key) ? allCategories[category].key : '';
			var subCategoryIDs = (allCategories[category].subCategoryIDs) ? allCategories[category].subCategoryIDs : [];
			var relatedCategories = (allCategories[category].relatedCategories) ? allCategories[category].relatedCategories : [];
			var isTopLevel = (allCategories[category].isTopLevel) ? allCategories[category].isTopLevel : null;
			var name = (allCategories[category].name) ? allCategories[category].name : '';
			var alternativeNames = (allCategories[category].alternativeNames) ? allCategories[category].alternativeNames : [];
			var description = (allCategories[category].description) ? allCategories[category].description : '';
			var dateCreated = (allCategories[category].dateCreated) ? allCategories[category].dateCreated : '';
			var dateEdited = (allCategories[category].dateEdited) ? allCategories[category].dateEdited : '';
			var editedBy = (allCategories[category].editedBy) ? allCategories[category].editedBy : '';
			var createdBy = (allCategories[category].createdBy) ? allCategories[category].createdBy : '';
			var parentCategory = (allCategories[category].parentCategory) ? allCategories[category].parentCategory : '';

			allCategories[category] = {
				["count"]: {
					[language]: {
						[type]: {
							[0]: exampleId
						}
					}
				},
				id,
				key,
				subCategoryIDs,
				relatedCategories,
				isTopLevel,
				name,
				alternativeNames,
				description,
				dateCreated,
				dateEdited,
				editedBy,
				createdBy,
				parentCategory
			}
		}

		this.setState({ allCategories: allCategories });
	}

	editExample(object, exampleId, oldExampleType, newExampleType, oldCategoryId, newCategoryId, oldLanguageId, newLanguageId) {
		console.log("Edit Example ", exampleId);
		console.log(object, exampleId, oldExampleType, newExampleType, oldCategoryId, newCategoryId, oldLanguageId, newLanguageId);
		var allExamples = this.state.allExamples;

		if(oldExampleType !== newExampleType || oldCategoryId !== newCategoryId || oldLanguageId !== newLanguageId) {
			this.removeExampleFromOldLocation(Number(exampleId), Number(oldCategoryId), Number(oldLanguageId), oldExampleType);
			this.addExampleToNewLocation(Number(exampleId), Number(newCategoryId), Number(newLanguageId), newExampleType);
		}

		allExamples[exampleId] = { ...object };

		this.setState({ allExamples: allExamples });
	};

	restoreExample(exampleId) {
		console.log("Restore Example ", exampleId);
		var allExamples = this.state.allExamples;
		allExamples[exampleId].isActive = true;
		this.setState({ allExamples: allExamples });
	};

	deleteExample(exampleId) {
		console.log("Delete Example ", exampleId);
		var allExamples = this.state.allExamples;
		allExamples[exampleId].isActive = false;
		this.setState({ allExamples: allExamples });
	};

	render() {
		if (this.state.allDataLoaded) {
			// console.log("All Data Loaded!");

			var languagesComponent = <Languages
				allLanguages = { this.state.allLanguages }
				selectedLanguages = { this.state.selectedLanguages }
				addToSelectedLanguages = { this.addToSelectedLanguages }
				removeSelectedLanguage = { this.removeSelectedLanguage }
			/>;

			var categoriesComponent = <CategoriesSidebar
				allCategories = { this.state.allCategories }
				topCategories = { this.state.topCategories }
				allDataLoaded = { this.state.allDataLoaded }
				params = { this.props.params }
			/>;

			var categoryComponent = <Examples
				allCategories = { this.state.allCategories }
				allExamples = { this.state.allExamples }
				allLanguages = { this.state.allLanguages }
				allUsers = { this.state.allUsers }
				allComments = { this.state.allComments }
				allDataLoaded = { this.state.allDataLoaded }
				params = { this.props.params }
				topCategories = { this.state.topCategories }
				selectedLanguages = { this.state.selectedLanguages }
				currentUserId = { this.state.currentUser }
				editCategory = { this.editCategory }
				deleteCategory = { this.deleteCategory }
			/>;

			var aboutComponent = <About /> ;

			var createCategoryComponent = <CreateCategory
				allCategories = { this.state.allCategories }
				allLanguages = { this.state.allLanguages }
				topCategories = { this.state.topCategories }
				newId = { this.state.allCategories.length }
				user = { this.state.allUsers[this.state.currentUser] }
				addCategory = { this.addCategory }
			/>;

			var createSnippetComponent = <CreateSnippet
				allCategories = { this.state.allCategories }
				allLanguages = { this.state.allLanguages }
				newId = { this.state.allExamples.length }
				user = { this.state.allUsers[this.state.currentUser] }
				addExample = { this.addExample }
			/>;

			var error404Component = <h1> Page Not Found </h1>;

			var homeComponent = <Home/> ;

			var loginComponent = <Login/> ;

			var openExampleCardComponent = <OpenExampleCard
				allCategories = { this.state.allCategories }
				allExamples = { this.state.allExamples }
				allLanguages = { this.state.allLanguages }
				allUsers = { this.state.allUsers }
				allComments = { this.state.allComments }
				allDataLoaded = { this.state.allDataLoaded }
				params = { this.props.params }
				selectedLanguages = { this.state.selectedLanguages }
				currentUserId = { this.state.currentUser }
				editExample = { this.editExample }
				deleteExample = { this.deleteExample }
				restoreExample = { this.restoreExample }
			/>;

			var searchResultsComponent = <SearchResults /> ;

			var userSettingsComponent = <UserSettings /> ;

			var editMenuComponent = <EditMenu /> ;

			var contentComponentStr = this.props.contentComponent;
			var contentComponent;

			if (contentComponentStr == 'about') {
				contentComponent = aboutComponent;
			} else if (contentComponentStr == 'category') {
				contentComponent = categoryComponent;
			} else if (contentComponentStr == 'createcategory') {
				contentComponent = createCategoryComponent;
			} else if (contentComponentStr == 'createsnippet') {
				contentComponent = createSnippetComponent;
			} else if (contentComponentStr == 'error404') {
				contentComponent = error404Component;
			} else if (contentComponentStr == 'home') {
				contentComponent = homeComponent;
			} else if (contentComponentStr == 'login') {
				contentComponent = loginComponent;
			} else if (contentComponentStr == 'openedexamplecard') {
				contentComponent = openExampleCardComponent;
			} else if (contentComponentStr == 'searchresults') {
				contentComponent = searchResultsComponent;
			} else if (contentComponentStr == 'usersettings') {
				contentComponent = userSettingsComponent;
			} else { <h1> Error!Unknown Content Component! </h1>
			}

			return ( <div className = "page-container" >
				<Header />

				<aside id = "categories"
				className = "col-md-2" >
				<div id = "react-categories" > { categoriesComponent } </div> </aside>

				<div className = "container-fluid" >
				<section id = "languages" >
				<div id = "react-languages"
				className = "col-md-12" > { languagesComponent } </div> </section>

				<section id = "content"
				className = "col-md-11 col-md-offset-1" > { contentComponent } </section>

				<EditMenu />
				</div>

				<Footer />
				</div>
			);

		} else {

			return ( <div className = "page-container loading"
				key = { this.state.allDataLoaded } >
				Loading... 
					<div className="loader">
					  <svg>
					  <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
					    <animateTransform attributeType="xml"
					      attributeName="transform"
					      type="rotate"
					      from="0 25 25"
					      to="360 25 25"
					      dur="1s"
					      repeatCount="indefinite"/>
					    </path>
					  </svg>
					</div>
				</div>
			);
		}
	}
}

Page.propTypes = {
	contentComponent: PropTypes.string,
	params: PropTypes.object
};

// Page.defaultProps = {
// 	allDataLoaded: false
// };

export default Page;
