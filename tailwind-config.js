tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          display: ['Poppins', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
        },
        colors: {
          navy: { 950:'#071A2B', 900:'#0B2A42', 800:'#0B3C6B', 700:'#12507F', 600:'#1A6493', 500:'#2E86C1', 400:'#5C93BE', 300:'#8FC1E0', 200:'#C3DAEC', 100:'#EAF4FB', 50:'#F5FAFD' },
          emerald: { 600:'#0E9F6E', 500:'#12B981', 400:'#34D399', 200:'#A8ECD1', 100:'#D6F5E8', 50:'#EFFDF6' },
          bgsoft: '#F8FAFC',
        },
        boxShadow: {
          soft: '0 10px 40px -12px rgba(11,60,107,0.18)',
          softlg: '0 25px 60px -15px rgba(11,60,107,0.25)',
        },
        borderRadius: { '3xl': '1.75rem' },
      }
    }
  }
