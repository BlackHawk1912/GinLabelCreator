document.addEventListener('DOMContentLoaded', function() {
    // Declare variables first
    const textInputs = ['brandName','ginName','ingredients','alcoholContent','amount'];
    const fontSizeSliders = ['brandNameSize','ginNameSize','ingredientsSize','alcoholContentSize','amountSize'];
    const fontBoldnessSliders = ['brandNameBoldness','ginNameBoldness','ingredientsBoldness','alcoholContentBoldness','amountBoldness'];
    const decorationLevelSlider = document.getElementById('decorationLevel');
    const decorationLevelValue = document.getElementById('decorationLevelValue');
    const borderThicknessSlider = document.getElementById('borderThickness');
    const borderThicknessValue = document.getElementById('borderThicknessValue');
    const blackAndWhiteToggle = document.getElementById('blackAndWhite');
    const paddingSlider = document.getElementById('padding');
    const paddingValue = document.getElementById('paddingValue');
    const internalMarginSlider = document.getElementById('internalMargin');
    const internalMarginValue = document.getElementById('internalMarginValue');
    const labelWidthSlider = document.getElementById('labelWidth');
    const labelWidthValue = document.getElementById('labelWidthValue');
    const colorControls = document.getElementById('colorControls');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const primaryColorInput = document.getElementById('primaryColor');
    const secondaryColorInput = document.getElementById('secondaryColor');

    // Tab Functionality
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button
                button.classList.add('active');
                
                // Show the corresponding tab content
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Save the active tab to localStorage
                localStorage.setItem('activeTab', tabId);
            });
        });
        
        // Check if there's a saved active tab
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            // Find the button that corresponds to the saved tab
            const savedButton = document.querySelector(`.tab-button[data-tab="${savedTab}"]`);
            if (savedButton) {
                savedButton.click();
            }
        }
    }

    function adjustLayout() {
        // Stub to prevent errors
    }

    function idToClass(id) {
        // Convert camelCase to kebab-case
        return id.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    function updateLabel() {
        // Get all input values
        const brandName = document.getElementById('brandName').value;
        const ginName = document.getElementById('ginName').value;
        const ingredients = document.getElementById('ingredients').value;
        const alcoholContent = document.getElementById('alcoholContent').value;
        const amount = document.getElementById('amount').value;
        
        // Get font sizes
        const brandNameSize = document.getElementById('brandNameSize').value;
        const ginNameSize = document.getElementById('ginNameSize').value;
        const ingredientsSize = document.getElementById('ingredientsSize').value;
        const alcoholContentSize = document.getElementById('alcoholContentSize').value;
        const amountSize = document.getElementById('amountSize').value;
        
        // Get font boldness
        const brandNameBoldness = document.getElementById('brandNameBoldness').value;
        const ginNameBoldness = document.getElementById('ginNameBoldness').value;
        const ingredientsBoldness = document.getElementById('ingredientsBoldness').value;
        const alcoholContentBoldness = document.getElementById('alcoholContentBoldness').value;
        const amountBoldness = document.getElementById('amountBoldness').value;
        
        // Update the preview with line breaks converted to <br> tags
        document.querySelector('.brand-name').innerHTML = brandName.replace(/\n/g, '<br>');
        document.querySelector('.gin-name').innerHTML = ginName.replace(/\n/g, '<br>');
        document.querySelector('.ingredients').innerHTML = ingredients.replace(/\n/g, '<br>');
        document.querySelector('.alcohol-content').innerHTML = alcoholContent;
        document.querySelector('.amount').innerHTML = amount;
        
        // Update font sizes
        document.querySelector('.brand-name').style.fontSize = `${brandNameSize}px`;
        document.querySelector('.gin-name').style.fontSize = `${ginNameSize}px`;
        document.querySelector('.ingredients').style.fontSize = `${ingredientsSize}px`;
        document.querySelector('.alcohol-content').style.fontSize = `${alcoholContentSize}px`;
        document.querySelector('.amount').style.fontSize = `${amountSize}px`;
        
        // Update font boldness
        document.querySelector('.brand-name').style.fontWeight = brandNameBoldness;
        document.querySelector('.gin-name').style.fontWeight = ginNameBoldness;
        document.querySelector('.ingredients').style.fontWeight = ingredientsBoldness;
        document.querySelector('.alcohol-content').style.fontWeight = alcoholContentBoldness;
        document.querySelector('.amount').style.fontWeight = amountBoldness;
        
        // Toggle visibility of font size and boldness sliders based on input values
        toggleSliderVisibility('brandName', brandName);
        toggleSliderVisibility('ginName', ginName);
        toggleSliderVisibility('ingredients', ingredients);
        toggleSliderVisibility('alcoholContent', alcoholContent);
        toggleSliderVisibility('amount', amount);
        
        // Get all flourish decorations
        const flourishElements = document.querySelectorAll('.flourish.decoration');
        
        // First flourish (between brand and gin name) - show only if both brand and gin name are present
        if (flourishElements[0]) {
            if (brandName.trim() !== '' && ginName.trim() !== '') {
                flourishElements[0].style.display = 'flex';
            } else {
                flourishElements[0].style.display = 'none';
            }
        }
        
        // Second flourish (between ingredients and bottom info) - show only if both alcohol content and amount are present
        if (flourishElements[1]) {
            if (alcoholContent.trim() !== '' && amount.trim() !== '') {
                flourishElements[1].style.display = 'flex';
            } else {
                flourishElements[1].style.display = 'none';
            }
        }
        
        // Handle bottom info layout - center when only one item is present
        const bottomInfo = document.querySelector('.bottom-info');
        const amountElement = document.querySelector('.amount');
        const alcoholContentElement = document.querySelector('.alcohol-content');
        
        if (alcoholContent.trim() !== '' && amount.trim() !== '') {
            // Both present - use space-between layout
            bottomInfo.style.justifyContent = 'space-between';
            amountElement.style.textAlign = 'left';
            alcoholContentElement.style.textAlign = 'right';
        } else if (alcoholContent.trim() !== '') {
            // Only alcohol content - center it
            bottomInfo.style.justifyContent = 'center';
            alcoholContentElement.style.textAlign = 'center';
        } else if (amount.trim() !== '') {
            // Only amount - center it
            bottomInfo.style.justifyContent = 'center';
            amountElement.style.textAlign = 'center';
        }
    }

    // Function to toggle visibility of font size and boldness sliders
    function toggleSliderVisibility(inputId, inputValue) {
        const fontSizeSliderContainer = document.getElementById(`${inputId}Size`).closest('.slider-container');
        const fontBoldnessSliderContainer = document.getElementById(`${inputId}Boldness`).closest('.slider-container');
        
        if (inputValue.trim() === '') {
            // Hide sliders if input is empty
            fontSizeSliderContainer.style.display = 'none';
            fontBoldnessSliderContainer.style.display = 'none';
        } else {
            // Show sliders if input has content
            fontSizeSliderContainer.style.display = 'flex';
            fontBoldnessSliderContainer.style.display = 'flex';
        }
    }

    function updateDecorationLevel() {
        const level = parseInt(decorationLevelSlider.value);
        const label = document.querySelector('.label');
        
        // Update decoration class
        label.className = label.className.replace(/dec-level-\d+/, `dec-level-${level}`);
        
        // Show/hide decorative elements based on level
        const decorations = document.querySelectorAll('.decoration');
        decorations.forEach((el, index) => {
            // Different elements appear at different levels
            let thresholdLevel;
            
            if (el.classList.contains('inner-border')) {
                thresholdLevel = 1;
            } else if (el.classList.contains('divider')) {
                thresholdLevel = 2;
            } else if (el.classList.contains('corner')) {
                thresholdLevel = 3;
            } else if (el.classList.contains('flourish')) {
                thresholdLevel = 4;
            } else if (el.classList.contains('ornament')) {
                thresholdLevel = 5;
            } else if (el.classList.contains('double-border')) {
                thresholdLevel = 6;
            } else if (el.classList.contains('squiggle-top') || el.classList.contains('squiggle-bottom')) {
                thresholdLevel = 999; // Set to a very high number to never show
            } else if (el.classList.contains('triple-border')) {
                thresholdLevel = 8;
            }
            
            if (level >= thresholdLevel) {
                el.style.opacity = '1';
            } else {
                el.style.opacity = '0';
            }
        });
        
        // Update divider appearance based on level
        const dividers = document.querySelectorAll('.divider');
        dividers.forEach(divider => {
            // Remove any previous center elements
            const centerElement = divider.querySelector('.divider-center');
            if (centerElement) {
                centerElement.remove();
            }
            
            // Add center elements based on level
            if (level >= 7) {
                const centerDiv = document.createElement('div');
                centerDiv.className = 'divider-center';
                centerDiv.style.position = 'absolute';
                centerDiv.style.left = '0';
                centerDiv.style.right = '0';
                centerDiv.style.top = '0';
                centerDiv.style.bottom = '0';
                centerDiv.style.display = 'flex';
                centerDiv.style.justifyContent = 'center';
                centerDiv.style.alignItems = 'center';
                
                if (level === 7) {
                    centerDiv.innerHTML = `
                        <svg width="100%" height="10" preserveAspectRatio="none" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,5 C10,2 20,8 30,5 C40,2 50,8 60,5 C70,2 80,8 90,5 C95,3.5 100,5 100,5" stroke="var(--secondary-color)" fill="none" stroke-width="1" />
                        </svg>
                    `;
                } else if (level === 8) {
                    centerDiv.innerHTML = `
                        <svg width="100%" height="15" preserveAspectRatio="none" viewBox="0 0 100 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,7.5 C10,3 20,12 30,7.5 C40,3 50,12 60,7.5 C70,3 80,12 90,7.5 C95,5 100,7.5 100,7.5" stroke="var(--secondary-color)" fill="none" stroke-width="1.2" />
                        </svg>
                    `;
                } else if (level === 9) {
                    centerDiv.innerHTML = `
                        <svg width="100%" height="18" preserveAspectRatio="none" viewBox="0 0 100 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,9 C10,3 20,15 30,9 C40,3 50,15 60,9 C70,3 80,15 90,9 C95,6 100,9 100,9" stroke="var(--secondary-color)" fill="none" stroke-width="1.5" />
                        </svg>
                    `;
                } else if (level === 10) {
                    centerDiv.innerHTML = `
                        <svg width="100%" height="20" preserveAspectRatio="none" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,10 C15,2 35,18 50,10 C65,2 85,18 100,10" stroke="var(--secondary-color)" fill="none" stroke-width="1.8" />
                        </svg>
                    `;
                }
                
                divider.appendChild(centerDiv);
            }
        });
        
        // Update internal margin value on page load
        document.documentElement.style.setProperty('--internal-margin', internalMarginSlider.value);
        internalMarginValue.textContent = `${internalMarginSlider.value}px`;
    }

    function updateFontBoldnessValue(id, value) {
        const valueSpan = document.getElementById(`${id}Value`);
        if (!valueSpan) return;
        
        if (value <= 300) {
            valueSpan.textContent = 'Light';
        } else if (value <= 400) {
            valueSpan.textContent = 'Normal';
        } else if (value <= 600) {
            valueSpan.textContent = 'Semi-Bold';
        } else if (value <= 700) {
            valueSpan.textContent = 'Bold';
        } else {
            valueSpan.textContent = 'Extra Bold';
        }
    }

    function saveAsPNG() {
        html2canvas(document.querySelector('.label-preview')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'label.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }

    // Save all user input to localStorage
    function saveToLocalStorage() {
        // Save text inputs
        textInputs.forEach(id => {
            const element = document.getElementById(id);
            localStorage.setItem(id, element.value);
        });
        
        // Save font size sliders
        fontSizeSliders.forEach(id => {
            const slider = document.getElementById(id);
            localStorage.setItem(id, slider.value);
        });
        
        // Save font boldness sliders
        fontBoldnessSliders.forEach(id => {
            const slider = document.getElementById(id);
            localStorage.setItem(id, slider.value);
        });
        
        // Save decoration level
        localStorage.setItem('decorationLevel', decorationLevelSlider.value);
        
        // Save border thickness
        localStorage.setItem('borderThickness', borderThicknessSlider.value);
        
        // Save padding
        localStorage.setItem('padding', paddingSlider.value);
        
        // Save internal margin
        localStorage.setItem('internalMargin', internalMarginSlider.value);
        
        // Save label width
        localStorage.setItem('labelWidth', labelWidthSlider.value);
        
        // Save color mode
        localStorage.setItem('blackAndWhite', blackAndWhiteToggle.checked);
        
        // Save color inputs
        localStorage.setItem('backgroundColor', backgroundColorInput.value);
        localStorage.setItem('primaryColor', primaryColorInput.value);
        localStorage.setItem('secondaryColor', secondaryColorInput.value);
    }
    
    // Load saved values from localStorage
    function loadFromLocalStorage() {
        // Load text inputs
        textInputs.forEach(id => {
            const savedValue = localStorage.getItem(id);
            if (savedValue) {
                document.getElementById(id).value = savedValue;
            }
        });
        
        // Load font size sliders
        fontSizeSliders.forEach(id => {
            const savedValue = localStorage.getItem(id);
            if (savedValue) {
                const slider = document.getElementById(id);
                slider.value = savedValue;
            }
        });
        
        // Load font boldness sliders
        fontBoldnessSliders.forEach(id => {
            const savedValue = localStorage.getItem(id);
            if (savedValue) {
                const slider = document.getElementById(id);
                slider.value = savedValue;
                updateFontBoldnessValue(id, savedValue);
            }
        });
        
        // Load decoration level
        const savedDecorationLevel = localStorage.getItem('decorationLevel');
        if (savedDecorationLevel) {
            decorationLevelSlider.value = savedDecorationLevel;
            decorationLevelValue.textContent = savedDecorationLevel;
            document.documentElement.style.setProperty('--decoration-level', savedDecorationLevel);
        }
        
        // Load border thickness
        const savedBorderThickness = localStorage.getItem('borderThickness');
        if (savedBorderThickness) {
            borderThicknessSlider.value = savedBorderThickness;
            borderThicknessValue.textContent = `${savedBorderThickness}px`;
            document.documentElement.style.setProperty('--border-width', savedBorderThickness + 'px');
        }
        
        // Load padding
        const savedPadding = localStorage.getItem('padding');
        if (savedPadding) {
            paddingSlider.value = savedPadding;
            paddingValue.textContent = `${savedPadding}px`;
            document.documentElement.style.setProperty('--padding', savedPadding);
        }
        
        // Load internal margin
        const savedInternalMargin = localStorage.getItem('internalMargin');
        if (savedInternalMargin) {
            internalMarginSlider.value = savedInternalMargin;
            internalMarginValue.textContent = `${savedInternalMargin}px`;
            document.documentElement.style.setProperty('--internal-margin', savedInternalMargin);
        }
        
        // Load label width
        const savedLabelWidth = localStorage.getItem('labelWidth');
        if (savedLabelWidth) {
            labelWidthSlider.value = savedLabelWidth;
            labelWidthValue.textContent = `${savedLabelWidth}px`;
            document.documentElement.style.setProperty('--label-width', savedLabelWidth);
        }
        
        // Load color mode and colors
        const savedBlackAndWhite = localStorage.getItem('blackAndWhite');
        const colorControls = document.getElementById('colorControls');
        
        // Load saved colors
        const savedBgColor = localStorage.getItem('backgroundColor') || '#F6F0ED';
        const savedPrimaryColor = localStorage.getItem('primaryColor') || '#28536B';
        const savedSecondaryColor = localStorage.getItem('secondaryColor') || '#7EA8BE';
        
        document.getElementById('backgroundColor').value = savedBgColor;
        document.getElementById('primaryColor').value = savedPrimaryColor;
        document.getElementById('secondaryColor').value = savedSecondaryColor;
        
        if (savedBlackAndWhite !== null) {
            blackAndWhiteToggle.checked = savedBlackAndWhite === 'true';
            if (blackAndWhiteToggle.checked) {
                // Black & White mode
                document.documentElement.style.setProperty('--main-color', '#000');
                document.documentElement.style.setProperty('--secondary-color', '#555555');
                document.documentElement.style.setProperty('--background-color', '#fff');
                colorControls.style.display = 'none';
            } else {
                // Color mode
                document.documentElement.style.setProperty('--main-color', savedPrimaryColor);
                document.documentElement.style.setProperty('--secondary-color', savedSecondaryColor);
                document.documentElement.style.setProperty('--background-color', savedBgColor);
                colorControls.style.display = 'block';
            }
        }
        
        // Set initial visibility of font size and boldness sliders based on input values
        textInputs.forEach(id => {
            const initialValue = document.getElementById(id).value;
            toggleSliderVisibility(id, initialValue);
        });
        
        // Call updateLabel to ensure all elements are properly aligned
        updateLabel();
        updateDecorationLevel();
    }
    
    // Utility function to get a random number within a range
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Utility function to get a random color
    function getRandomColor() {
        // Generate a color that's visually pleasing - not too dark or too bright
        const r = getRandomNumber(30, 220);
        const g = getRandomNumber(30, 220);
        const b = getRandomNumber(30, 220);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Calculate color luminance (for contrast checking)
    function getLuminance(hexColor) {
        // Remove # if present
        hexColor = hexColor.replace('#', '');
        
        // Convert hex to RGB
        const r = parseInt(hexColor.substr(0, 2), 16) / 255;
        const g = parseInt(hexColor.substr(2, 2), 16) / 255;
        const b = parseInt(hexColor.substr(4, 2), 16) / 255;
        
        // Calculate luminance using the formula for relative luminance in sRGB space
        const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
        
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    // Calculate contrast ratio between two colors
    function getContrastRatio(color1, color2) {
        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        
        // Calculate contrast ratio using WCAG formula
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        
        return (brightest + 0.05) / (darkest + 0.05);
    }

    // Generate a color with sufficient contrast to the reference color
    function getContrastingColor(referenceColor, minContrast = 4.5) {
        let attempts = 0;
        let newColor;
        let contrast;
        
        // Try up to 20 times to find a color with sufficient contrast
        do {
            newColor = getRandomColor();
            contrast = getContrastRatio(referenceColor, newColor);
            attempts++;
        } while (contrast < minContrast && attempts < 20);
        
        return newColor;
    }

    // Function to randomize all settings
    function randomize() {
        // Random gin brand names
        const brandNames = [
            "NORTHERN SPIRIT",
            "ARTISANAL DRY",
            "BOTANICAL CRAFT",
            "DISTILLER'S SELECT",
            "HANDCRAFTED PREMIUM",
            "WILD HARVEST",
            "COASTAL RESERVE",
            "MASTER'S BATCH",
            "HERITAGE DISTILLED",
            "SIGNATURE COLLECTION"
        ];
        
        // Random gin names
        const ginNames = [
            "London Dry Gin",
            "Barrel Aged Gin",
            "Navy Strength Gin",
            "Old Tom Gin",
            "Sloe Gin",
            "Botanical Gin",
            "Citrus Gin",
            "Small Batch Gin",
            "Craft Gin",
            "Reserve Gin"
        ];
        
        // Common gin botanicals
        const botanicals = [
            "Juniper Berries",
            "Coriander Seeds",
            "Angelica Root",
            "Orris Root",
            "Cassia Bark",
            "Cinnamon",
            "Lemon Peel",
            "Orange Peel",
            "Cardamom",
            "Licorice Root",
            "Grains of Paradise",
            "Cubeb Berries",
            "Rose Petals",
            "Lavender",
            "Elderflower",
            "Nutmeg",
            "Ginger"
        ];
        
        // Random alcohol content values
        const alcoholContents = [
            "37.5% ALC/VOL",
            "40% ALC/VOL",
            "42.3% ALC/VOL",
            "43.1% ALC/VOL",
            "44% ALC/VOL",
            "45.7% ALC/VOL",
            "47.3% ALC/VOL",
            "57% ALC/VOL (NAVY STRENGTH)"
        ];
        
        // Random bottle amounts
        const amounts = [
            "700ml / 23.7 fl oz",
            "750ml / 25.4 fl oz",
            "500ml / 16.9 fl oz",
            "350ml / 11.8 fl oz",
            "200ml / 6.8 fl oz",
            "1L / 33.8 fl oz"
        ];
        
        // Randomize text content
        document.getElementById('brandName').value = brandNames[getRandomNumber(0, brandNames.length - 1)];
        document.getElementById('ginName').value = ginNames[getRandomNumber(0, ginNames.length - 1)];
        
        // Create random ingredient list with 4-8 botanicals
        const numBotanicals = getRandomNumber(4, 8);
        const shuffledBotanicals = [...botanicals].sort(() => 0.5 - Math.random());
        const selectedBotanicals = shuffledBotanicals.slice(0, numBotanicals);
        document.getElementById('ingredients').value = selectedBotanicals.join(", ");
        
        document.getElementById('alcoholContent').value = alcoholContents[getRandomNumber(0, alcoholContents.length - 1)];
        document.getElementById('amount').value = amounts[getRandomNumber(0, amounts.length - 1)];
        
        // Randomize font sizes
        const brandNameSize = getRandomNumber(18, 24);
        const ginNameSize = getRandomNumber(42, 60); // Make gin name significantly larger than brand name
        const ingredientsSize = getRandomNumber(10, 14);
        const alcoholContentSize = getRandomNumber(12, 18); // Same random value will be used for both
        
        document.getElementById('brandNameSize').value = brandNameSize;
        document.getElementById('ginNameSize').value = ginNameSize;
        document.getElementById('ingredientsSize').value = ingredientsSize;
        document.getElementById('alcoholContentSize').value = alcoholContentSize;
        document.getElementById('amountSize').value = alcoholContentSize; // Use same size as alcohol content
        
        // Randomize font weights
        const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
        const brandNameBoldness = fontWeights[getRandomNumber(0, fontWeights.length - 1)];
        const ginNameBoldness = fontWeights[getRandomNumber(0, fontWeights.length - 1)];
        const ingredientsBoldness = fontWeights[getRandomNumber(0, fontWeights.length - 1)];
        const alcoholContentBoldness = fontWeights[getRandomNumber(0, fontWeights.length - 1)]; // Same random value will be used for both
        
        document.getElementById('brandNameBoldness').value = brandNameBoldness;
        document.getElementById('ginNameBoldness').value = ginNameBoldness;
        document.getElementById('ingredientsBoldness').value = ingredientsBoldness;
        document.getElementById('alcoholContentBoldness').value = alcoholContentBoldness;
        document.getElementById('amountBoldness').value = alcoholContentBoldness; // Use same boldness as alcohol content
        
        // Randomize decoration and border
        document.getElementById('decorationLevel').value = getRandomNumber(3, 8);
        document.getElementById('borderThickness').value = getRandomNumber(1, 5);
        
        // Randomize padding and margins
        document.getElementById('padding').value = getRandomNumber(25, 60);
        document.getElementById('internalMargin').value = getRandomNumber(5, 20);
        
        // Randomize label width
        document.getElementById('labelWidth').value = getRandomNumber(250, 400);
        
        // Randomly decide if we should use colors
        const useColors = Math.random() > 0.5;
        document.getElementById('blackAndWhite').checked = !useColors;
        
        if (useColors) {
            // Randomize colors with pleasing combinations and sufficient contrast
            const backgroundColor = getRandomColor();
            
            // Generate primary color with good contrast against background
            const primaryColor = getContrastingColor(backgroundColor, 4.5);
            
            // Generate secondary color with decent contrast against background
            // but not necessarily as high contrast as primary color
            const secondaryColor = getContrastingColor(backgroundColor, 3);
            
            document.getElementById('backgroundColor').value = backgroundColor;
            document.getElementById('primaryColor').value = primaryColor;
            document.getElementById('secondaryColor').value = secondaryColor;
            
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--main-color', primaryColor);
            document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        } else {
            // Black & White mode
            document.documentElement.style.setProperty('--main-color', '#000');
            document.documentElement.style.setProperty('--secondary-color', '#555555');
            document.documentElement.style.setProperty('--background-color', '#fff');
        }
        
        // Update all slider value displays
        updateFontSizeValues();
        updateFontBoldnessValues();
        updateDecorationLevelValue();
        updateOtherValues();
        
        // Update the label with new values
        updateLabel();
        updateDecorationLevel();
        
        // Save to local storage
        saveToLocalStorage();
    }
    
    // Helper functions to update values
    function updateFontSizeValues() {
        fontSizeSliders.forEach(id => {
            const value = document.getElementById(id).value;
            document.getElementById(`${id}Value`).textContent = `${value}px`;
        });
    }
    
    function updateFontBoldnessValues() {
        fontBoldnessSliders.forEach(id => {
            const value = document.getElementById(id).value;
            updateFontBoldnessValue(id, value);
        });
    }
    
    function updateDecorationLevelValue() {
        const value = decorationLevelSlider.value;
        decorationLevelValue.textContent = value;
    }
    
    function updateOtherValues() {
        borderThicknessValue.textContent = `${borderThicknessSlider.value}px`;
        paddingValue.textContent = `${paddingSlider.value}px`;
        internalMarginValue.textContent = `${internalMarginSlider.value}px`;
        labelWidthValue.textContent = `${labelWidthSlider.value}px`;
    }

    // Debounce function to limit how often a function is called
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Use requestAnimationFrame for smooth UI updates
    function rafDebounce(func) {
        let rafId = null;
        return function() {
            const context = this;
            const args = arguments;
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => {
                func.apply(context, args);
                rafId = null;
            });
        };
    }
    
    // Create optimized versions of heavy functions
    const debouncedUpdateLabel = rafDebounce(updateLabel);
    const debouncedSaveToLocalStorage = debounce(saveToLocalStorage, 500);
    const debouncedUpdateDecorationLevel = rafDebounce(updateDecorationLevel);
    
    // Initialize the application
    function init() {
        // Initial update
        setupTabs();
        updateLabel();
        updateDecorationLevel();
        adjustLayout();
        
        // Check for saved settings
        if (localStorage.getItem('labelSettings')) {
            loadFromLocalStorage();
        }
        
        // Set up text input listeners
        textInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                // Get the current input value
                const inputValue = document.getElementById(id).value;
                
                // Toggle slider visibility based on input value
                toggleSliderVisibility(id, inputValue);
                
                debouncedUpdateLabel();
                debouncedSaveToLocalStorage();
            });
            
            // Check initial state and show sliders for non-empty inputs
            const initialValue = document.getElementById(id).value;
            toggleSliderVisibility(id, initialValue);
        });
        
        // Font size slider event listeners with improved performance
        fontSizeSliders.forEach(id => {
            const slider = document.getElementById(id);
            const valueSpan = document.getElementById(`${id}Value`);
            
            // Use input event for real-time updates
            slider.addEventListener('input', function() {
                // Update the value display immediately
                valueSpan.textContent = `${this.value}px`;
                
                // Update the corresponding element's font size directly for immediate feedback
                const className = idToClass(id.replace('Size', ''));
                const targetEl = document.querySelector(`.${className}`);
                if (targetEl) {
                    targetEl.style.fontSize = `${this.value}px`;
                }
                
                // Use requestAnimationFrame for the heavier operations
                debouncedUpdateLabel();
                debouncedSaveToLocalStorage();
            });
        });

        // Font boldness slider event listeners with improved performance
        fontBoldnessSliders.forEach(id => {
            const slider = document.getElementById(id);
            if (!slider) return;
            
            // Use input event for real-time updates
            slider.addEventListener('input', function() {
                // Update the value display immediately
                updateFontBoldnessValue(id, this.value);
                
                // Update the corresponding element's font boldness directly for immediate feedback
                const className = idToClass(id.replace('Boldness', ''));
                const targetEl = document.querySelector(`.${className}`);
                if (targetEl) {
                    targetEl.style.fontWeight = this.value;
                }
                
                // Use optimized functions for heavier operations
                debouncedSaveToLocalStorage();
            });
        });

        // Decoration level slider with improved performance
        decorationLevelSlider.addEventListener('input', function() {
            // Update the value display immediately
            decorationLevelValue.textContent = this.value;
            
            // Set the CSS property immediately
            document.documentElement.style.setProperty('--decoration-level', this.value);
            
            // Use optimized functions for heavier operations
            debouncedUpdateDecorationLevel();
            debouncedSaveToLocalStorage();
        });

        // Border thickness slider with improved performance
        borderThicknessSlider.addEventListener('input', function() {
            // Update the value display immediately
            borderThicknessValue.textContent = `${this.value}px`;
            
            // Set the CSS property immediately
            document.documentElement.style.setProperty('--border-width', this.value + 'px');
            
            // Use optimized functions for heavier operations
            debouncedSaveToLocalStorage();
        });

        // Padding slider with improved performance
        paddingSlider.addEventListener('input', function() {
            // Update the value display immediately
            paddingValue.textContent = `${this.value}px`;
            
            // Set the CSS property immediately
            document.documentElement.style.setProperty('--padding', this.value);
            
            // Use optimized functions for heavier operations
            debouncedUpdateLabel();
            debouncedSaveToLocalStorage();
        });

        // Internal margin slider with improved performance
        internalMarginSlider.addEventListener('input', function() {
            // Update the value display immediately
            internalMarginValue.textContent = `${this.value}px`;
            
            // Set the CSS property immediately
            document.documentElement.style.setProperty('--internal-margin', this.value);
            
            // Use optimized functions for heavier operations
            debouncedUpdateLabel();
            debouncedSaveToLocalStorage();
        });

        // Label width slider with improved performance
        labelWidthSlider.addEventListener('input', function() {
            // Update the value display immediately
            labelWidthValue.textContent = `${this.value}px`;
            
            // Set the CSS property immediately
            document.documentElement.style.setProperty('--label-width', this.value);
            
            // Use optimized functions for heavier operations
            debouncedSaveToLocalStorage();
        });

        blackAndWhiteToggle.addEventListener('change', () => {
            if (blackAndWhiteToggle.checked) {
                // Black & White mode
                document.documentElement.style.setProperty('--main-color', '#000');
                document.documentElement.style.setProperty('--secondary-color', '#555555');
                document.documentElement.style.setProperty('--background-color', '#fff');
            } else {
                // Color mode
                const primaryColor = document.getElementById('primaryColor').value;
                const secondaryColor = document.getElementById('secondaryColor').value;
                const bgColor = document.getElementById('backgroundColor').value;
                
                document.documentElement.style.setProperty('--main-color', primaryColor);
                document.documentElement.style.setProperty('--secondary-color', secondaryColor);
                document.documentElement.style.setProperty('--background-color', bgColor);
            }
            
            saveToLocalStorage();
        });

        // Color input event listeners
        document.getElementById('backgroundColor').addEventListener('input', function() {
            document.documentElement.style.setProperty('--background-color', this.value);
            saveToLocalStorage();
        });
        
        document.getElementById('primaryColor').addEventListener('input', function() {
            document.documentElement.style.setProperty('--main-color', this.value);
            saveToLocalStorage();
        });
        
        document.getElementById('secondaryColor').addEventListener('input', function() {
            document.documentElement.style.setProperty('--secondary-color', this.value);
            saveToLocalStorage();
        });

        document.getElementById('saveButton').addEventListener('click', saveAsPNG);

        document.getElementById('randomizeButton').addEventListener('click', randomize);
        
        // Initialize padding value on page load
        document.documentElement.style.setProperty('--padding', paddingSlider.value);
        paddingValue.textContent = `${paddingSlider.value}px`;
        
        // Initialize label width value on page load
        document.documentElement.style.setProperty('--label-width', labelWidthSlider.value);
        labelWidthValue.textContent = `${labelWidthSlider.value}px`;
        
        // Call updateLabel to ensure all elements are properly aligned
        updateLabel();
        updateDecorationLevel();
    }

    // Start the app
    init();
});