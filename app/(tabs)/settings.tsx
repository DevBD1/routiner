import { StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SettingsScreen() {
  const { user, signOut, linkWithGoogle, linkWithApple, isAppleSignInAvailable } = useAuth();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      // For web, use a simple confirmation
      if (window.confirm('Are you sure you want to logout?')) {
        signOut().catch(error => {
          console.error('Logout error:', error);
          alert('Failed to logout. Please try again.');
        });
      }
    } else {
      // For native platforms, use Alert.alert
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => {
              signOut().catch(error => {
                console.error('Logout error:', error);
                Alert.alert('Error', 'Failed to logout. Please try again.');
              });
            },
          },
        ]
      );
    }
  };

  const handleLinkAccount = async (provider: 'google' | 'apple') => {
    try {
      if (provider === 'google') {
        await linkWithGoogle();
      } else if (provider === 'apple' && isAppleSignInAvailable) {
        await linkWithApple();
      }
      Alert.alert('Success', 'Account linked successfully!');
    } catch (error) {
      console.error('Error linking account:', error);
      Alert.alert('Error', 'Failed to link account. Please try again.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        {/* User Profile Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Profile</ThemedText>
          <ThemedView style={styles.profileItem}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <ThemedText style={styles.value}>{user?.email}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.profileItem}>
            <ThemedText style={styles.label}>Display Name</ThemedText>
            <ThemedText style={styles.value}>{user?.displayName || 'Not set'}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Account Linking Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Linked Accounts</ThemedText>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => handleLinkAccount('google')}
          >
            <ThemedText style={styles.linkButtonText}>Link Google Account</ThemedText>
          </TouchableOpacity>
          {isAppleSignInAvailable && (
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkAccount('apple')}
            >
              <ThemedText style={styles.linkButtonText}>Link Apple Account</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        {/* App Settings Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>App Settings</ThemedText>
          <Collapsible title="Notifications">
            <ThemedText>Configure your notification preferences</ThemedText>
          </Collapsible>
          <Collapsible title="Privacy">
            <ThemedText>Manage your privacy settings</ThemedText>
          </Collapsible>
        </ThemedView>

        {/* About Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>
          <ExternalLink href="https://github.com/yourusername/routiner">
            <ThemedText style={styles.link}>View on GitHub</ThemedText>
          </ExternalLink>
        </ThemedView>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({ ios: '#ffffff', android: '#ffffff' }),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
