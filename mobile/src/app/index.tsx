import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const features = [
  {
    title: "Budget",
    description:
        "Create monthly budgets for bills, groceries, transport, savings, and personal spending.",
  },
  {
    title: "Recurring Payments",
    description:
        "Track subscriptions, debit orders, rent, policies, and other repeating expenses.",
  },
  {
    title: "Goals",
    description:
        "Set savings goals and monitor your progress toward things that matter.",
  },
  {
    title: "Spending Insights",
    description:
        "Understand where your money goes and spot patterns before they become problems.",
  },
  {
    title: "Debt Tracking",
    description:
        "Keep an eye on repayments and plan how to reduce debt over time.",
  },
  {
    title: "Reports",
    description:
        "View simple summaries of your monthly income, expenses, and progress.",
  },
];

export default function HomeScreen() {
  return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.badge}>Personal budgeting made simple</Text>

          <Text style={styles.title}>Map your money before it disappears.</Text>

          <Text style={styles.subtitle}>
            MoneyMap helps you understand your income, expenses, savings, and
            spending habits in one simple place.
          </Text>

          <View style={styles.actions}>
            <Link href="/signup" style={styles.primaryButton}>
              Get Started
            </Link>

            <Link href="/login" style={styles.secondaryButton}>
              Login
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why MoneyMap?</Text>
          <Text style={styles.sectionSubtitle}>
            A practical tool for everyday money decisions.
          </Text>

          <View style={styles.featureList}>
            {features.map((feature) => (
                <View key={feature.title} style={styles.featureCard}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
            ))}
          </View>
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Take control of your money journey.</Text>

          <Text style={styles.ctaText}>
            Start with a simple budget. Grow into smarter financial planning.
          </Text>

          <Link href="/signup" style={styles.ctaButton}>
            Start Mapping
          </Link>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 56,
    alignItems: "center",
    backgroundColor: "#ECFDF5",
  },
  badge: {
    backgroundColor: "#D1FAE5",
    color: "#047857",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 18,
    fontSize: 16,
    lineHeight: 24,
    color: "#4B5563",
    textAlign: "center",
  },
  actions: {
    marginTop: 32,
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#059669",
    color: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 14,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    overflow: "hidden",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    overflow: "hidden",
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  sectionSubtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
    textAlign: "center",
  },
  featureList: {
    marginTop: 28,
    gap: 14,
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 18,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  featureDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },
  cta: {
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#030712",
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  ctaText: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: "#D1D5DB",
    textAlign: "center",
  },
  ctaButton: {
    marginTop: 24,
    backgroundColor: "#10B981",
    color: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    overflow: "hidden",
  },
});