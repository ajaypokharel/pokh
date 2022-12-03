# The Pokh Programming Language

Pokh is programming language that supports functional programming to some level. This is my attempt at creating (and learning how to create one) a programming language from scratch. This is a work in progress, so one might not be able to code up a complex program using this.

## Features of the programming languages

- Variable Asignments
- Functions
- Data Types such as Integers, Double, Strings, Boolean
- Data Structures such as Dynamic Arrays (list), Dictionaries
- Looping Mechanisms (for loop)
- Conditionals
- Built-in Functions
- Numerical Operations
- Commenting (both in-line and not in-line)

## Syntax

__Variable Assignments__

```go
// pokh uses ':=' as assignment operator
a := 1
b := "Hello World"
c1 := [1, 2, 3]
```

__Comments__

```go
// This is how to write a comment
 a := 1 // You can write a comment here too
```

__Data Types/Structures__

```javascript
// an integer
num1 := 12

// a double
num2 := 4.13

// a string
str1 := "Hello World"
str2 := "12Hi"

// boolean
bool1 := true
bool2 := false

// a list
list1 := [1, 2, 3]
list2 := [1, "pokh", "java", 29]

// a dictionary
dict_1 := {
    1: "pokh",
    2: "java",
    3: "javascript"
    4: [1,2,3]
}


// some important built-in functions

stdout("hello world")   // outputs hello world to the screen
sum(args)   // returns the sum of the arguments
mod(x, y)   // returns x modulo y
pow(x, y)   // returns x ^ y
max(args)   // return maximum from the args
min(args)   // returns minimum from the args
len(input)   // returns the length of the input (must be an iterable)

// conditionals

if a == 2 {
    stdout("It's two")
} else if a > 2 {
    stdout("It's more")
} else {
    stdout("Invalid")
}

// functions
// at this point our function do no support return statement but we are working on that
myfunc(x, y) {
    m := sum(x,y)
    j := mod(x, y)
    stdout(m, j)
}

// for loop

for i in list1 {
    stdout(i)
}
```

## Test Pokh

- Clone the repo

- Copy and paste the following code in a .pokh file

```javascript

a := [1, "a", 4]


for i in a {
    stdout(i)
}

age:= 12.5
// this
stdout("Hello", age)    // comment

myfunc(x, y) {
    m := sum(x,y)
    j := mod(x, y)
    stdout(m, j)
}

myfunc(10, 3)


if a == 2 {
    stdout("It's two")
} else if a > 2 {
    stdout("It's more")
} else {
    stdout("Invalid")
}
```

- Run `./run-pokh.sh <name of the file>`
- You should see the output. Feel free to modify the code

## Future Works

- Add stdin function to take input from users
- Add return statement to the functions
- Add typing features
