const array1 = {
    "LoginDetails": [
      {
        "username": "prerelease.auto",
        "password": "Manoj@2023"
      },
      {
        "username": "manoj.auto",
        "password": "Manoj@2023"
      }
    ],
    "SearchPatient": [
      {
        "pat_firstname": "Rambo",
        "pat_lastname": "Dhoni",
        "pat_sex": "M"
      },
      {
        "pat_firstname": "Anil",
        "pat_lastname": "Kumbale",
        "pat_sex": "M"
      },
      {
        "pat_firstname": "Sachin",
        "pat_lastname": "Tendulkar",
        "pat_sex": "M"
      },
      {
        "pat_firstname": "Virat",
        "pat_lastname": "Kohali",
        "pat_sex": "F"
      },
      {
        "pat_firstname": "Mario",
        "pat_lastname": "M",
        "pat_sex": "M"
      }
    ],
    "AddNewPatient": [
      {
        "pat_firstname": "Shree",
        "pat_lastname": "Vyavahare",
        "pat_sex": "M",
        "pat_dob": 41782
      }
    ],
    "AddAddress": [],
    "AddPIP": [],
    "AddGP": []
  }
array1.LoginDetails.forEach((element) =>

console.log(element)

);

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"