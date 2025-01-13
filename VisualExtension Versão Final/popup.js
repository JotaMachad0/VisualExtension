document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('applyFilterButton').addEventListener('click', () => {
      let colorblindnessType = document.getElementById('colorblindnessType').value;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: 'applyFilter', colorblindnessType: colorblindnessType });
      });
    });
  });
  