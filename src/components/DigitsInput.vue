<template>
    <input type="text" :id="componentId" :class="componentClass" v-bind:value="inputNumber" v-on:input="filterDigits" />
</template>

<script>
    export default {
        data() {
            return {
                inputNumber: '',
                previousValue: '',
            }
        },
        props: {
            numDigits: {
                type: Number,
                required: true
            },
            parentValue: {
                type: String,
                required: true
            },
            componentClass: {
                type: String,
                required: false
            },
            componentId: {
                type: String,
                required: false
            }
        },
        watch: {
            parentValue(newValue) {
                this.inputNumber = newValue;
            }
        },
        methods: {
            filterDigits(event) {
                // NOTE: This 'event' is and instance of 'InputEvent'
                let newValue = event.target.value;
                let isNum = /^\d+$/.test(newValue);
                if (newValue.length > this.numDigits) {
                    // Prevent default is not keeping extra characters from being displayed in input
                    // so trigger reactivity by adding and removing space
                    this.inputNumber += ' ';
                    // Had to use '=' to trigger reactivity
                    this.inputNumber = this.inputNumber.trim();
                }
                else if (isNum) {
                    this.inputNumber = newValue;
                    this.previousValue = newValue;
                    this.$emit('updatePhone', this.inputNumber);
                }
                else {
                    // Edge case where 'previousValue' length is one and the 'backspace' key is pressed
                    if (this.previousValue.length == 1 && !event.data) {
                        this.previousValue = '';
                    }
                    this.inputNumber = this.previousValue;
                    // Trigger reactivity in case numbers were already the same (see comment above)
                    this.inputNumber += ' ';
                    this.inputNumber = this.inputNumber.trim();

                    this.$emit('updatePhone', this.inputNumber);
                }
            }
        }
    }
</script>

<style scoped>

</style>
