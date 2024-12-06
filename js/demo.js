let lightMode = true; //dtermines if lightmode is on
let store = ""; //stores current equation
let history = "History:<br/>"; //historylog
let lPar = 0; //Left parenthesis left open
let rPar = 0; //Right Parenthesis
let currentNum = "";


function calculate() { //Conversion part is done, now I need the lookup oart
	let problem;
	let output;
	let solution;

	//Gets equation
	problem = store;

	//ends program (nonfunctional at the moment)
	if(problem == "end")
	{
		return 0;
	}
	else
	{
		//turns input equation into a literal equation, automatically handles PEMDAS and decimals
		solution = eval(problem);

		//limits to 2 decimal places, got weird rounding errors without this
		solution = solution.toFixed(2)

		//displays results
		store = "";
		store = solution;
		currentNum = solution;
		document.getElementById("display").innerHTML = "solution";
		output = problem + " = " + solution;
		history += "| " + output + " |<br/>"
		document.getElementById("history").innerHTML = history;
	}
}

function getInput(input) {
	let mProblem = store; //Math problem
	let count = 0;
	let dec = false; //checks whether current number is a decimal
	let last;
 //Amount of open parenthesis, any extra will be closed at the end
		count = mProblem.length;
		last = mProblem[count - 1];

		//Storage to revert to

		switch(input)
		{
			//mathmatical symbols
			case "-": 
				if(last == "-")
				{
					mProblem += "(";
					lPar++;
				}
			case "+": 
			case "/": 
			case "*": 
			case "**": 
			case "(": 
				if(input == "(")
				{
					lPar++;
				}
			case ")":
				if(input == ")" && (lPar > rPar) && (lPar > 0))
				{
					rPar++;
				}
				else if(input == ")")
				{
					input = "";
				}
				//adds 0 after decimal point if needed
				if(dec && last == ".")
				{
					mProblem += 0;
				}
				dec = false;
				mProblem += input;
				currentNum = "";
				
				break;
			case ".":
				//adds 0 before decimal point if needed
				if((!dec && isNaN(last)) || count == 0)
				{
					mProblem += 0;
				}
				if(!dec)
				{
					mProblem += input;
					currentNum += input;
				}
				dec = true;
				break;
			case null:
			case undefined:
				//ends the program if the user hits cancel
				return "end";
			case "=": 
				//adds 0 to end of decimal if needed
				if(dec && last == ".")
				{
					mProblem += 0;
				}
				//Closes any open parenthesis
				mProblem += closer();
				//returns equation
				store = mProblem;
				calculate();
				return mProblem;
			default:
				if(isNaN(input))
				{
					if(input != "b" && input != "B")
					{
						alert("Invalid Input: Must be a number or mathmatical symbol");
					}
					else if(count > 0)
					{
						//Backspace if B or b is pressed, removes one character from the end
						if(dec && last == ".")
						{
							dec = false;
						}
						else if(last == "(")
						{
							lPar--;
						}
						else if(last == ")")
						{
							rPar--;
						}

						mProblem = mProblem.substring(0, mProblem.length - 1);
						if(mProblem == "" || store == "")
						{
							document.getElementById("display").innerHTML = "0";
						}

						if(currentNum != "")
						{
							currentNum = currentNum.substring(0, currentNum.length - 1);
						}
						else
						{
							if(mProblem.length > 0)
							{
								let temp = "";
								for(let i = mProblem.length - 1; i >= 0; i--)
								{
									if(isNaN(mProblem[i]) && mProblem[i] != ".")
									{
										i = -1;
									}
									else
									{
										temp += mProblem[i];
									}
								}
								for(let i = temp.length - 1; i >= 0; i--)
								{
									currentNum += temp[i];
								}
							}
						}
					}
				}
				else
				{
					currentNum += input;
					mProblem += input;
				}
		}
		store = mProblem;
		return mProblem;
}

function closer() { //Amount of open parenthesis
	let closing = "";

	//adds closed parenthesis onto the end if needed
	while(lPar > rPar)
	{
		closing += ")";
		rPar++;
	}

	return closing;
}

function calcButtons(input) {
	//parse input

	//negative
	if(input == 'n')
	{
		if(currentNum != "")
		{
			store = store.substring(0, store.length - currentNum.length);
			if(currentNum[0] == "-")
			{
				currentNum = currentNum.substring(1, currentNum.length);
			}
			else
			{
				if(store[store.length - 1] == "-" )
				{
					store += "(";
					lPar++;
				}
				currentNum = "-" + currentNum;
			}
			store += currentNum;
		}
	}

	//clear
	if(input == 'c')
	{
		store = "";
		currentNum = "";
		history += "<br/><--------clear--------><br/>";
		document.getElementById("history").innerHTML = history;
	}
	//other inputs
	else if(input != 'c' && input != 'n')
	{
		getInput(input);
		
	}	

	if(store != "")
	{
		document.getElementById("display").innerHTML = store;
	}
	else
	{
		document.getElementById("display").innerHTML = "0";
	}
}

function light() { //basic light/dark mode
	//default color
	let base = "";

	//dark mode colors
	let bg = "#444444"; //background
	let tx = "#dddddd"; //text
	let hd = "#3672f5"; //header
	let hdbg = "#222222"; //header bg
	let clbg = "#9c0000"; //calc bg
	let dbg = "#bb510a";//display bg
	let dtx = "#dddddd";//display text
	let ldbg = "#dddddd";//lightmode btn bg
	let ldtx = "#3b3b3b";//lightmode btn text
	lightMode = !lightMode;
	if(lightMode)
	{
		document.getElementById("LD").innerHTML = "Toggle Dark Mode";
		document.getElementById("LD").style.color = base;
		document.getElementById("LD").style.backgroundColor = base;
		document.getElementById("b").style.color = base;
		document.getElementById("b").style.backgroundColor = base;
		document.getElementById("h").style.color = base;
		document.getElementById("h").style.backgroundColor = base;
		document.getElementById("calc").style.backgroundColor = base;
		document.getElementById("display").style.backgroundColor = base;
		document.getElementById("display").style.color = base;
		document.getElementById("historyLog").style.backgroundColor = base;
		document.getElementById("historyLog").style.color = base;

		//changes each button's color
		for(let i = 0; i < 22; i++)
		{
			document.querySelector(".calcButtonDark").className = "calcButton";
		}

		document.querySelector(".footDark").className = "foot";
		document.querySelector(".footDark").className = "foot";
		
	}
	else
	{
		
		document.getElementById("LD").innerHTML = "Toggle Light Mode";
		document.getElementById("LD").style.color = ldtx;
		document.getElementById("LD").style.backgroundColor = ldbg;
		document.getElementById("b").style.color = tx;
		document.getElementById("b").style.backgroundColor = bg;
		document.getElementById("h").style.color = hd;
		document.getElementById("h").style.backgroundColor = hdbg;
		document.getElementById("calc").style.backgroundColor = clbg;
		document.getElementById("display").style.backgroundColor = dbg;
		document.getElementById("display").style.color = dtx;
		document.getElementById("historyLog").style.backgroundColor = dbg;
		document.getElementById("historyLog").style.color = dtx;

		//changes each button's color
		for(let i = 0; i < 22; i++)
		{
			document.querySelector(".calcButton").className = "calcButtonDark";
		}
		document.querySelector(".foot").className = "footDark";
		document.querySelector(".foot").className = "footDark";
	}
}
