window.scrumboard = (function($) {
    var self = {};
    var events = {};

    function emit(event) {
        if (!events[event]) return;

        var args = _.toArray(arguments).slice(1);
        _.each(events[event], function(cb) {
            cb.apply(null, args);
        });
    }

    function unselect() {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {
            document.selection.empty();
        }
    }

    function onEdit($el) {
        var $p = $el.parent();
        unselect();
        $el.attr('contenteditable', true).focus();
        if ($p.hasClass('ui-draggable')) $p.draggable('disable');
    }

    function offEdit($el) {
        var $p = $el.parent();
        $el.attr('contenteditable', false);
        if ($p.hasClass('ui-draggable')) $p.draggable('enable');
        $el.trigger('edit');
    }

    $(function() {
        var $main = $('#main');

        $('body').on('dblclick', '.editable', function() {
            onEdit($(this));
        }).on('blur', '.editable', function() {
            offEdit($(this));
        });

        $main.on('drop', '.status', function(e, ui) {
            var task = ui.draggable;
            var status = this;
            emit('change-status', $(task), $(status));
        });

        self.addStatus = function(status) {
            var $status = $('<div>');
            var $title = $('<h2>').text(status.title);
            if (status.id) $status.attr('id', 'satus-' + status.id);
            $title.addClass('editable');
            $status.addClass('status').data('status', status);
            $status.append($title);
            $main.append($status);
            $title.on('edit', function() {
                emit('edit-status', $status);
            });

            $status.droppable();
        };

        self.removeStatus = function(statusId) {
            if (!statusId) $main.find('div:last').remove();
            else $main.find('#status-' + statusId).remove();
        };

        self.addTask = function(task) {
            var $task = $('<div>');
            var $title = $('<h3>');
            var rot = -4 + (Math.random() * 8);
            var color = (['blue','green','white','yellow'])[task.id % 4];
            $task.addClass('task ' + color).css({
                left: 80,
                top: 550,
                position: 'absolute',
                WebkitTransform: 'rotate(' + rot + 'deg)',
                '-moz-transform': 'rotate(' + rot + 'deg)'
            });
            $title.addClass('editable').text(task.title);
            $task.append($title);
            $task.data('task', task);
            $task.draggable();
            $('body').append($task);

            $title.on('edit', function() {
                emit('edit-task', $task);
            });
        };

        self.clear = function() {
            $main.empty();
            $('.task').remove();
            emit('ready');
        };

        self.clear();
    });

    self.on = function(event, cb) {
        if (!events[event]) events[event] = [];
        events[event].push(cb);
    };

    return self;
})(jQuery);
