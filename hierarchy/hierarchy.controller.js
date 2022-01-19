const dbService = require('../db/db.service');


let parentsList = [];
let printString = '';

async function getHierarchyForId(id, clearList = true) {

   if (clearList) {
      // Clear the parent list on every Router calling
      parentsList = [];
   }
   await getHierarchyParentsRecursive(id);
   return printString;

   
   //console.log('Frank Snow -> Deena Duarte -> David Suarez');
} 

// Recursive function to get the list of parents
const getHierarchyParentsRecursive = async(id) => {
   
   const hierarchy = await getHierarchyById(id);
   parentsList.push(hierarchy.name);   
   const parentId = hierarchy.parentMemberId;   
   const level = hierarchy.level;
   if (level <= 1) {
      printString = await printList(parentsList);
      return;
   }      
   await getHierarchyParentsRecursive(parentId);
}


// Print function for the parent list by format: paren.name -> parent.name -> parent(n-1).name
const printList = async(list) => {   
   
   let printString = '';
   list.reverse();
   list.pop();   
   for (memeber in parentsList) {
      if (memeber == (parentsList.length - 1)) {
         printString += parentsList[memeber];
      } else {
         printString += parentsList[memeber] + " -> ";
      }
   }
   printString = `\nPrint All Parents:\n--------------------- \n\n${printString}\n`;
   console.log(printString);
   return printString;
}

// Get the Hirarchy row from db (json)
async function getHierarchyById(id) {
   return await dbService.getHierarchyItemById(id);
}

const id = 9;
getHierarchyForId(id);


module.exports = {
   getHierarchyForId
};