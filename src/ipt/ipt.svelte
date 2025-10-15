<script>
    const key_manager = {
        last_key: "",
        end_quote: false,
        end_marks: [".", "?", "!"],
        end_trigger: [" ", "\""],
        shifted: false
    }
    const action_keys = [
        ...key_manager.end_marks, 
        ...key_manager.end_trigger, 
        "Enter"
    ]

    let ipt;

    const end_action = () => {
        key_manager.last_key = ""
        key_manager.shifted = true
        ipt.focus()
    }

    const controller = evt => {
        if (evt.key == "Backspace" && !ipt.value) {
            evt.preventDefault()
            ipt.focus()
            return;
        }
        if (!action_keys.includes(evt.key)) {
            key_manager.last_key = evt.key
            return;
        }
        const { key } = evt
        const user_input = ipt.value.trim()
        if (key_manager.end_trigger.includes(key)) {
            if (key_manager.end_quote) {
                if (key_manager.end_marks.includes(key_manager.last_key)) {
                    // commit sentence
                    // create new sentence
                    end_action()
                    return;
                }
                else
                    key_manager.end_quote = false
            }
            key_manager.last_key = key
            return;
        }
        if (key_manager.end_marks.includes(key)) {
            key_manager.end_quote = true
            key_manager.last_key = key
            return;
        }

        // "Enter"
        if (!user_input) {
            // create section
        }
        else {
            const [cmd, ...args] = user_input.split(" ")
            
        }
        end_action()
    }
    const cleanup = (evt) => {
        if (key_manager.shifted) {
            key_manager.shifted = false
            ipt.value = ""
            ipt.focus()
        }
        if (evt.key == "Backspace")
            evt.preventDefault()
    }
</script>

<textarea bind:this={ipt}
    on:keydown={controller}
    on:keyup={cleanup}
></textarea>