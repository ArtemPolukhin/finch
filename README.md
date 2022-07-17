# Description
The game has two fields with 19 and 2 cells.
A player should select no more than 8 numbers in the first field and 1 number in the scond one.
After clickng 'Show result' the game generates two arrays, with 8 unique and random numbers and with 2 numbers.
Player won if 4 or more numbers in the first field coincide with random ones or if 3 numbers in the first field and 1 number in the second one coicide with random ones.

Result of one attempt sends to a server. 
Button 'Wand' generates randomly selected numbers. 

If server is unavailable the game tries again twice with 2 seconds interval.
If response is still not ok then error messages appears.

# How to install
- Clone or download repository
- Run 'install_and_run.bat' file or open terminal and enter 'npm i'

# start
- Open 'start.bat' file or open terminal and enter 'npm start'