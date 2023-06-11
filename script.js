        function generateGanttChart() {
            // Clear any previous errors
            document.getElementById("errorMessages").innerHTML = "";
            
            // Retrieve input values
            var processes = parseInt(document.getElementById("processes").value);
            var arrivalTimes = document.getElementById("arrivalTimes").value.trim();
            var burstTimes = document.getElementById("burstTimes").value.trim();
            var algorithm = document.getElementById("algorithm").value;

            // Validate input values
            if (isNaN(processes) || processes <= 0) {
                displayError("Number of processes must be a positive integer.");
                return;
            }

            var arrivalArray = arrivalTimes.split(",");
            var burstArray = burstTimes.split(",");

            if (arrivalArray.length !== processes || burstArray.length !== processes) {
                displayError("Number of arrival times and burst times must match the number of processes.");
                return;
            }

            for (var i = 0; i < processes; i++) {
                if (isNaN(parseInt(arrivalArray[i])) || isNaN(parseInt(burstArray[i])) || parseInt(arrivalArray[i]) < 0 || parseInt(burstArray[i]) <= 0) {
                    displayError("Arrival times and burst times must be non-negative integers.");
                    return;
                }
            }

            // Perform scheduling based on selected algorithm
            var completionTimes = [];
            var turnaroundTimes = [];
            var waitingTimes = [];

            if (algorithm === "FCFS") {
                performFCFS(processes, arrivalArray, burstArray, completionTimes, turnaroundTimes, waitingTimes);
            } else {
                // Implement other scheduling algorithms here
                // For example, implement Round Robin (RR), Shortest Job First (SJF), etc.
                displayError("Selected algorithm is not supported.");
                return;
            }

            // Generate Gantt Chart and display results
            displayResults(processes, arrivalArray, burstArray, completionTimes, turnaroundTimes, waitingTimes);
        }

        function performFCFS(processes, arrivalArray, burstArray, completionTimes, turnaroundTimes, waitingTimes) {
            var currentTime = 0;

            for (var i = 0; i < processes; i++) {
                if (currentTime < parseInt(arrivalArray[i])) {
                    currentTime = parseInt(arrivalArray[i]);
                }

                completionTimes[i] = currentTime + parseInt(burstArray[i]);
                turnaroundTimes[i] = completionTimes[i] - parseInt(arrivalArray[i]);
                waitingTimes[i] = turnaroundTimes[i] - parseInt(burstArray[i]);

                currentTime = completionTimes[i];
            }
        }

        function displayResults(processes, arrivalArray, burstArray, completionTimes, turnaroundTimes, waitingTimes) {
            var ganttChart = document.getElementById("ganttChart");
            ganttChart.innerHTML = "";

            var table = document.createElement("table");
            var headerRow = table.insertRow(0);
            headerRow.innerHTML = "<th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Completion Time</th><th>Turnaround Time</th><th>Waiting Time</th>";

            for (var i = 0; i < processes; i++) {
                var row = table.insertRow(i + 1);
                row.innerHTML = "<td>" + (i + 1) + "</td><td>" + arrivalArray[i] + "</td><td>" + burstArray[i] + "</td><td>" + completionTimes[i] + "</td><td>" + turnaroundTimes[i] + "</td><td>" + waitingTimes[i] + "</td>";
            }

            ganttChart.appendChild(table);
        }

        function displayError(errorMessage) {
            var errorContainer = document.getElementById("errorMessages");
            var errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.innerHTML = errorMessage;
            errorContainer.appendChild(errorElement);
        }

 
function shareOnWhatsApp() {
    var repoLink = "https://github.com/ShubhamChoudharyShubh/process-scheduling-solver";
    var message = "Check out this awesome GitHub repository: " + repoLink;
    var whatsappLink = "https://wa.me/?text=" + encodeURIComponent(message);
    window.open(whatsappLink);
}
