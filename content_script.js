walk(document);

function walk(node){
	// from http://is.gd/mwZp7E
	var child, next;

	switch(node.nodeType){
		case 1: // Element
		case 9: // Document
		case 11:// Document Fragment
			child = node.firstChild;
			while(child){
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: //Text
			handleText(node);
			break;
	}
}
function hyphen(text_node,search_string,replace_string){
	var v = text_node.nodeValue;

	var end_hyphen = new RegExp('\\b-'+search_string+'\\b','g');
	v = v.replace(end_hyphen,'-'+replace_string);

	var middle_hyphen = new RegExp('\\b-'+search_string+'-\\b','g');
	v = v.replace(middle_hyphen,'-'+replace_string+'-');

	var begin_hyphen = new RegExp('\\b'+search_string+'-\\b','g');
	v = v.replace(begin_hyphen,replace_string+'-');

	text_node.nodeValue = v;
}
function posessive(text_node,search_string,replace_string){
	var v = text_node.nodeValue;

	var d_posessive = new RegExp('\\b'+search_string+'\'','g');
	v = v.replace(d_posessive,replace_string+'\'');

	text_node.nodeValue = v;
}

function expand_string(text_node,search_string,replace_string){



	var search_beginning = search_string.charAt(0).toUpperCase();
	var search_end = search_string.slice(1,search_string.length);
	var search_uppercase = search_string.toUpperCase();
	
	var replace_beginning = replace_string.charAt(0).toUpperCase();
	var replace_end = replace_string.slice(1,replace_string.length);
	var replace_uppercase = replace_string.toUpperCase();

	//regular
	//first leter uppercase
	//all uppercase

	hyphen(text_node,search_string,replace_string);
	hyphen(text_node,search_beginning+search_end,replace_beginning+replace_end);
	hyphen(text_node,search_uppercase,replace_uppercase);

	posessive(text_node,search_string,replace_string);
	posessive(text_node,search_beginning+search_end,replace_beginning+replace_end);
	posessive(text_node,search_uppercase,replace_uppercase);

	var v = text_node.nodeValue;
	
	var d_proper = new RegExp('\\b'+search_beginning+search_end+'\\b','g');
	v = v.replace(d_proper,replace_beginning+replace_end);

	var d_lower = new RegExp('\\b'+search_string+'\\b','g');
	v = v.replace(d_lower,replace_string);

	text_node.nodeValue = v;
}


function handleText(text_node){

	handlePronouns(text_node);
	expand_string(text_node,"guy","gal");
	expand_string(text_node,"boy","girl");
	expand_string(text_node,"boyfriend","girlfriend");
	expand_string(text_node,"Mr.","Ms.");
	expand_string(text_node,"father","mother");
	expand_string(text_node,"husband","wife");
	expand_string(text_node,"moustache","head-of-hair");
	expand_string(text_node,"male","female");
	expand_string(text_node,"hubby","wifey");
	expand_string(text_node,"repairman","repairwoman");
	expand_string(text_node,"handyman","handywoman");
	expand_string(text_node,"man","woman");
	expand_string(text_node,"dad","mom");


	expand_string(text_node,"men","women");
	expand_string(text_node,"brother","sister");
	expand_string(text_node,"bro","sis");
}

function handlePronouns(text_node){

	//Proper Pronouns; the person is only identified by pronoun.
	expand_string(text_node,"he","she");
	expand_string(text_node,"him","her");
	expand_string(text_node,"his","her/s");

	var v = text_node.nodeValue;

	v = v.replace(/\bhe\/she\b/g,"_they_");
	v = v.replace(/\bhe\\she\b/g,"_they_");
	v = v.replace(/\bshe\/he\b/g,"_they_");
	v = v.replace(/\bshe\\he\b/g,"_they_");
	//Yelling
	v = v.replace(/\bHE\/SHE\b/g,"_THEY_");
	v = v.replace(/\bHE\\SHE\b/g,"_THEY_");
	v = v.replace(/\bSHE\/HE\b/g,"_THEY_");
	v = v.replace(/\bSHE\\HE\b/g,"_THEY_");


	text_node.nodeValue = v;
}
