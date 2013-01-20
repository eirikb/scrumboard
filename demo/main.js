scrumboard.on('ready', function() {
    var statusId = 0;
    var taskId = 0;

    $('#add-status').click(function() {
        scrumboard.addStatus({
            id: statusId++,
            title: 'New'
        });
    });

    $('#remove-status').click(function() {
        scrumboard.removeStatus();
    });

    $('#add-task').click(function() {
        scrumboard.addTask({
            id: taskId++,
            title: 'Placeholder'
        });
    });

    scrumboard.on('change-status', function($task, $status) {
        var task = $task.data('task');
        var status = $status.data('status');
        console.log('change status!');
        console.log('task', task);
        console.log('status', status);
    });


    scrumboard.addStatus({
        id: taskId++,
        title: 'New Status'
    });

    scrumboard.addTask({
        id: taskId++,
        title: 'test'
    });
});
