export function Footer() {
  return (
    <footer className="border-t bg-background text-sm text-muted-foreground p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          © {new Date().getFullYear()} Wafaqi Mohtasib Secretariat
        </div>
        <div>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="ml-4 hover:text-primary">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
