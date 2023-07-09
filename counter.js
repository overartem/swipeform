export function setupCounter(element) {
    // let counter = 0;
    const sendButton = element.querySelector('#send');
    const JobName = element.querySelector('.profession-list .active');
    const JobNameText = JobName.textContent || JobName.innerText;
    sendButton.addEventListener('click', function (e) {
        e.preventDefault();
        const formData = new FormData(element);
        formData.append('myField', 'myValue');
        for (const [key, value] of formData) {
            console.log(`${key}: ${value}`);
        }

        console.log(JobNameText);
    });
    // const setCounter = (count) => {
    //   counter = count
    //   element.innerHTML = `count is ${counter}`
    // }
    // element.addEventListener('click', () => setCounter(counter + 1))
    // setCounter(0)
}
