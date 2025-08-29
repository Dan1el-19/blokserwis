// BLOKSERWIS Mass Migration Script
const fs = require('fs');
const path = require('path');

const publicDir = './public';
const backupDir = './backup';

// Files to migrate
const htmlFiles = [
  'kontakt.html',
  'uslugi.html', 
  'realizacje.html',
  'zaufalinam.html',
  'domofony_lodz.html',
  'wideodomofony_lodz.html',
  'monitoring_lodz.html',
  'naprawa_monitoringu_lodz.html',
  'naprawa_wideodomofonow_lodz.html',
  'konserwacja_domofonow_lodz.html',
  'montaz_wideodomofonow_lodz.html',
  'serwis_domofonow_lodz.html',
  'serwis_wideodomofonow_lodz.html'
];

// Old scripts pattern to remove
const oldScriptsPattern = `    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css" media="screen" />   
   
    <script type="text/javascript" src="./scripts/jquery.min.js"></script>   
    <script type="text/javascript" src="./scripts/jquery.bxslider.min.js"></script> 
    <script type="text/javascript" src="./scripts/jquery.fancybox.js?v=2.1.5"></script>
    
    <script>
      jQuery(document).ready(function($) {
        $('.bxtop').bxSlider({            
            captions: false,
            pager: false,
            autoHover:true,
            randomStart:true,
            auto:true
          });
      });

      $(document).ready(function(){
        $('.fancybox').fancybox({
          // padding: 0,
          openEffect : 'elastic',
          openSpeed  : 150,
          closeEffect : 'elastic',
          closeSpeed  : 150,
          nextClick : true,
          closeClick : true       
        });
      });            
  </script>`;

// New modern bundle
const newScripts = `    <!-- Modern libraries bundled by Vite -->
    <script type="module" src="js/modern-bundle.js"></script>`;

console.log('🔧 Starting BLOKSERWIS mass migration...');
console.log(`📁 Processing ${htmlFiles.length} files`);

htmlFiles.forEach(filename => {
  const filePath = path.join(publicDir, filename);
  const backupPath = path.join(backupDir, filename.replace('.html', '_old.html'));
  
  try {
    // Read original file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Create backup
    fs.writeFileSync(backupPath, content);
    console.log(`💾 Backup created: ${backupPath}`);
    
    // Replace old scripts with modern bundle
    const modernContent = content.replace(oldScriptsPattern, newScripts);
    
    // Write modernized file
    fs.writeFileSync(filePath, modernContent);
    console.log(`✅ Modernized: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log('🎉 Mass migration completed!');
console.log('📊 Summary:');
console.log(`  - Files migrated: ${htmlFiles.length}`);
console.log(`  - Backups created in: ${backupDir}`);
console.log(`  - Modern bundle: js/modern-bundle.js`);
console.log('');
console.log('🚀 Next steps:');
console.log('  1. Test each page on http://localhost:3000/');
console.log('  2. Check console for any errors');
console.log('  3. Verify slider and gallery functionality');
console.log('  4. Run npm run build when ready');
