// Action Functions
// import {
// 	addToSelectedLanguages,
// 	removeSelectedLanguage,
// 	addRelatedCategory,
// 	removeRelatedCategory,
// 	removeRelatedCategory2,
// 	checkRelatedCategories,
// 	addToTopCategories,
// 	removeFromTopCategories,
// 	removeFromParentCategory,
// 	addToParentCategory,
// 	checkParentCategory,
// 	addCategory,
// 	deleteCategory,
// 	editCategory,
// 	addExample,
// 	removeExampleFromOldLocation,
// 	addExampleToNewLocation,
// 	editExample,
// 	restoreExample,
// 	deleteExample
// } from './Actions';

export function addToSelectedLanguages(key) {
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

export function removeSelectedLanguage(key) {
    // console.log(this.state);
    console.log("Remove language " + key);
    var selectedLanguages = this.state.selectedLanguages;
    selectedLanguages.splice(key, 1);
    this.setState({ selectedLanguages: selectedLanguages });
}

export function addRelatedCategory(newCategoryId, relatedCategoryId) {
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

export function removeRelatedCategory(originalCategory, categoryId) {
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

export function removeRelatedCategory2(categoryId, originalCategory) {
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

export function checkRelatedCategories(originalIds, newIds, categoryId) {
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

export function addToTopCategories(categoryId) {
    console.log("addToTopCategories categoryId:", categoryId);
    var topCategories = this.state.topCategories;
    topCategories.push(`${categoryId}`);
    this.setState({ topCategories: topCategories });
}

export function removeFromTopCategories(categoryId) {
    console.log("removeFromTopCategories categoryId:", categoryId);
    var topCategories = this.state.topCategories;
    var index = topCategories.indexOf(categoryId);
    if (index > -1) {
        topCategories.splice(index, 1);
    }
    this.setState({ topCategories: topCategories });
}

export function removeFromParentCategory(parentCategoryId, categoryId) {
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

export function addToParentCategory(parentCategoryId, categoryId) {
    console.log("addToParentCategory parentCategoryId:", parentCategoryId, " categoryId:", categoryId);
    var allCategories = this.state.allCategories;

    if(allCategories[parentCategoryId].subCategoryIDs && allCategories[parentCategoryId].subCategoryIDs !== 'None') {
        allCategories[parentCategoryId].subCategoryIDs.push(`${categoryId}`);
    } else {
        allCategories[parentCategoryId].subCategoryIDs = [`${categoryId}`];
    }
}

export function checkParentCategory(categoryId, originalParentCategory, newParentCategory) {
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

export function addCategory(object, index, selectedParentCategory, isTopLevel, relatedCategoryIDs) {
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

export function deleteCategory(categoryId) {
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

export function editCategory(object, categoryId, originalParentCategory, newParentCategory) {
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

export function addExample(object, index, category, language, isSyntax) {
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

export function removeExampleFromOldLocation(exampleId, category, language, type) {
    console.log("removeExampleFromOldLocation", exampleId, category, language, type);
    var allCategories = this.state.allCategories;

    var index = allCategories[category]["count"][language][type].indexOf(exampleId);
    if (index > -1) {
        allCategories[category]["count"][language][type].splice(index, 1);
    }
    
    this.setState({ allCategories: allCategories });
}

export function addExampleToNewLocation(exampleId, category, language, type) {
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

export function editExample(object, exampleId, oldExampleType, newExampleType, oldCategoryId, newCategoryId, oldLanguageId, newLanguageId) {
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

export function restoreExample(exampleId) {
    console.log("Restore Example ", exampleId);
    var allExamples = this.state.allExamples;
    allExamples[exampleId].isActive = true;
    this.setState({ allExamples: allExamples });
};

export function deleteExample(exampleId) {
    console.log("Delete Example ", exampleId);
    var allExamples = this.state.allExamples;
    allExamples[exampleId].isActive = false;
    this.setState({ allExamples: allExamples });
};