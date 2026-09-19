function formatDateForInput(date) {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


/* Automatically set today's date */

window.onload = function () {

    const currentDateInput =
        document.getElementById("currentDate");

    const today = new Date();

    currentDateInput.value =
        formatDateForInput(today);

    currentDateInput.max =
        formatDateForInput(today);
};


function calculateAge() {

    const dobInput =
        document.getElementById("dob").value;

    const currentDateInput =
        document.getElementById("currentDate").value;


    if (!dobInput || !currentDateInput) {

        document.getElementById("ageResult").textContent =
            "Please select both dates.";

        return;
    }


    const [birthYear, birthMonth, birthDay] =
        dobInput.split("-").map(Number);

    const [currentYear, currentMonth, currentDay] =
        currentDateInput.split("-").map(Number);


    const dob =
        new Date(
            birthYear,
            birthMonth - 1,
            birthDay
        );

    const currentDate =
        new Date(
            currentYear,
            currentMonth - 1,
            currentDay
        );


    /* Prevent invalid date range */

    if (currentDate < dob) {

        document.getElementById("ageResult").textContent =
            "Current date must be after your birth date.";

        return;
    }


    let age =
        currentDate.getFullYear() -
        dob.getFullYear();

    let months =
        currentDate.getMonth() -
        dob.getMonth();

    let days =
        currentDate.getDate() -
        dob.getDate();


    /* Birthday hasn't happened yet */

    if (
        months < 0 ||
        (months === 0 && days < 0)
    ) {
        age--;
    }


    /* Calculate remaining months and days */

    const adjustedBirthDate =
        new Date(
            dob.getFullYear() + age,
            dob.getMonth(),
            dob.getDate()
        );


    months =
        currentDate.getMonth() -
        adjustedBirthDate.getMonth();

    days =
        currentDate.getDate() -
        adjustedBirthDate.getDate();


    /* Borrow days from previous month */

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            );

        days += previousMonth.getDate();
    }


    /* Convert negative months */

    if (months < 0) {
        months += 12;
    }


    document.getElementById("ageResult").textContent =
        `${age} years, ${months} months, ${days} days`;
}