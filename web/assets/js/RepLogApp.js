(function (window, $) {
    'use strict';
    window.RepLogApp = {
        initialize: function ($wrapper) {
            this.$wrapper = $wrapper;
            this.helper = new Helper($wrapper);


            this.$wrapper.find('.js-delete-rep-log').on(
                'click',
                this.handRepLogDelete.bind(this)
            );

            this.$wrapper.find('tbody tr').on(
                'click',
                this.handleRowClick.bind(this)
            );

            console.log('instance of helper->', this.helper, Object.keys(this.helper));
            console.log('Helper Obj->', Helper, Object.keys(Helper));
            console.log('thistotlw', this.helper.calculateTotalWeight());
        },

        updateTotalWeightLifted: function () {
            this.$wrapper.find('.js-total-weight').html(
                this.helper.calculateTotalWeight()
            );
        },

        handRepLogDelete: function (e) {
            e.preventDefault();

            var $link = $(e.currentTarget);
            $link.addClass('text-danger');
            $link.find('.fa')
                .removeClass('fa-trash')
                .addClass('fa-spinner')
                .addClass('fa-spin');

            var deleteUrl = $link.data('url');
            var $row = $link.closest('tr');
            var self = this;

            $.ajax({
                url: deleteUrl,
                method: 'DELETE',
                success: function () {
                    $row.fadeOut('normal', function () {
                        $(this).remove();
                        self.updateTotalWeightLifted();
                    });
                }
            })
        },

        handleRowClick: function () {
            console.log('row cliked');
        },
    };

    /**
     * A "private" object
     */
    var Helper  = function ($wrapper) {
        this.$wrapper = $wrapper;
    };
    Helper.prototype.calculateTotalWeight = function () {
        var totalWeight = 0;
        this.$wrapper.find('tbody tr').each(function () {
            totalWeight += $(this).data('weight');
        });

        return totalWeight;
    };

})(window, jQuery);
