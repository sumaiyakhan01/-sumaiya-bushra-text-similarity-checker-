function preprocess(text) {
    return text.toLowerCase()
               .replace(/[^\w\s]/g, ' ')
               .replace(/\s+/g, ' ')
               .trim();
}

function longestCommonSubsequence(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to get LCS string
    let lcs = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            lcs = s1[i - 1] + lcs;
            i--; j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return { length: dp[m][n], sequence: lcs };
}

function compareTexts() {
    const rawText1 = document.getElementById('text1').value;
    const rawText2 = document.getElementById('text2').value;
    
    if (!rawText1.trim() || !rawText2.trim()) {
        alert('Please enter both documents!');
        return;
    }
    
    const text1 = preprocess(rawText1);
    const text2 = preprocess(rawText2);
    
    const result = longestCommonSubsequence(text1.replace(/\s/g, ''), text2.replace(/\s/g, ''));
    const maxLen = Math.max(text1.length, text2.length);
    const similarity = ((result.length / maxLen) * 100).toFixed(1);
    
    // Update results
    document.getElementById('similarity').textContent = similarity + '%';
    document.getElementById('lcs-length').textContent = result.length + ' chars';
    document.getElementById('status').textContent = similarity > 70 ? '🚨 High Similarity' : 
                                                   similarity > 30 ? '⚠️ Moderate' : '✅ Low Risk';
    document.getElementById('status').style.background = similarity > 70 ? '#fff3cd' : 
                                                        similarity > 30 ? '#fff3cd' : '#e8f5e8';
    document.getElementById('common-result').textContent = result.sequence || 'No significant common subsequence';
    
    // Scroll to results
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
}

// Enter key support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        compareTexts();
    }
});
