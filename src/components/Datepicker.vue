<template>
    <input type="text">
</template>

<script>
    import $ from 'jquery'
    require('jquery-ui/ui/widgets/datepicker.js');
    require('jquery-ui/themes/base/core.css');
    require('jquery-ui/themes/base/datepicker.css');
    require('jquery-ui/themes/base/theme.css');

    export default {
        name: "Datepicker",
        props: {
            dateFormat: {
                type: String,
                required: true
            },
            // dateType: 1 = orderDate, 2 = requiredDate, 3 = shippedDate
            dateType: {
                type: Number,
                required: true
            },
            initialDate: {
                type: Date,
                required: false
            }
        },
        watch: {
            initialDate() {
                // NOTE: Need watch on this prop since need to explicitly update wrapped jQuery datepicker
                $(this.$el).datepicker("setDate", this.initialDate);
            }
        },
        mounted: function() {
            var self = this;
            $(this.$el).datepicker({
                dateFormat: this.dateFormat,
                onSelect: function(dateText) {
                    var type = self.dateType;
                    self.$emit('update-date', { dtValue: dateText, dtType: type });
                }
            })
            .datepicker("setDate", this.initialDate);
            $(this.$el).attr('readonly', true);
            //console.log("Datepicker initialDate: " + this.initialDate);
        },
        beforeDestroy: function() {
            $(this.$el).datepicker('hide').datepicker('destroy');
        }

    }
</script>

<style scoped>
</style>
