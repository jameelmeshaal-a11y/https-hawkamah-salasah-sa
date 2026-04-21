export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          assigned_to: string | null
          assigned_to_name: string | null
          budget: number | null
          completion_percentage: number | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          notes: string | null
          org_id: string | null
          project_id: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          budget?: number | null
          completion_percentage?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          notes?: string | null
          org_id?: string | null
          project_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          budget?: number | null
          completion_percentage?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          org_id?: string | null
          project_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      assembly_members: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          join_date: string | null
          membership_number: string | null
          membership_type: string | null
          national_id_hash: string | null
          notes: string | null
          org_id: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          join_date?: string | null
          membership_number?: string | null
          membership_type?: string | null
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          join_date?: string | null
          membership_number?: string | null
          membership_type?: string | null
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assembly_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string
          date: string
          employee_id: string
          id: string
          notes: string | null
          org_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          date?: string
          employee_id: string
          id?: string
          notes?: string | null
          org_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          org_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          action: string
          actor_user_id: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          module_key: string | null
          occurred_at: string
          org_id: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          module_key?: string | null
          occurred_at?: string
          org_id?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          module_key?: string | null
          occurred_at?: string
          org_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_number: string
          account_type: string | null
          balance: number | null
          bank_name: string
          created_at: string
          currency: string | null
          iban: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          org_id: string | null
          updated_at: string
        }
        Insert: {
          account_number: string
          account_type?: string | null
          balance?: number | null
          bank_name: string
          created_at?: string
          currency?: string | null
          iban?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          account_number?: string
          account_type?: string | null
          balance?: number | null
          bank_name?: string
          created_at?: string
          currency?: string | null
          iban?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      beneficiaries: {
        Row: {
          category: string | null
          city: string | null
          created_at: string
          full_name: string
          id: string
          national_id_hash: string | null
          org_id: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          city?: string | null
          created_at?: string
          full_name: string
          id?: string
          national_id_hash?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          city?: string | null
          created_at?: string
          full_name?: string
          id?: string
          national_id_hash?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      board_members: {
        Row: {
          appointment_date: string | null
          created_at: string
          email: string | null
          end_date: string | null
          full_name: string
          id: string
          national_id_hash: string | null
          notes: string | null
          org_id: string | null
          phone: string | null
          position: string
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date?: string | null
          created_at?: string
          email?: string | null
          end_date?: string | null
          full_name: string
          id?: string
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          position?: string
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string | null
          created_at?: string
          email?: string | null
          end_date?: string | null
          full_name?: string
          id?: string
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          position?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          fiscal_year: number
          id: string
          name: string
          notes: string | null
          org_id: string | null
          remaining_amount: number | null
          spent_amount: number | null
          status: string
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          fiscal_year: number
          id?: string
          name: string
          notes?: string | null
          org_id?: string | null
          remaining_amount?: number | null
          spent_amount?: number | null
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          fiscal_year?: number
          id?: string
          name?: string
          notes?: string | null
          org_id?: string | null
          remaining_amount?: number | null
          spent_amount?: number | null
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_centers: {
        Row: {
          budget: number | null
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          org_id: string | null
          parent_id: string | null
          spent_amount: number | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          org_id?: string | null
          parent_id?: string | null
          spent_amount?: number | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          org_id?: string | null
          parent_id?: string | null
          spent_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cost_centers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      decisions: {
        Row: {
          created_at: string
          decision_number: string
          description: string | null
          execution_date: string | null
          id: string
          meeting_id: string | null
          org_id: string | null
          responsible_person: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          decision_number: string
          description?: string | null
          execution_date?: string | null
          id?: string
          meeting_id?: string | null
          org_id?: string | null
          responsible_person?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          decision_number?: string
          description?: string | null
          execution_date?: string | null
          id?: string
          meeting_id?: string | null
          org_id?: string | null
          responsible_person?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "decisions_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      dependents: {
        Row: {
          beneficiary_id: string | null
          birth_date: string | null
          created_at: string
          full_name: string
          gender: string | null
          id: string
          notes: string | null
          org_id: string | null
          relationship: string | null
          status: string
          updated_at: string
        }
        Insert: {
          beneficiary_id?: string | null
          birth_date?: string | null
          created_at?: string
          full_name: string
          gender?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          relationship?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          beneficiary_id?: string | null
          birth_date?: string | null
          created_at?: string
          full_name?: string
          gender?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          relationship?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dependents_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dependents_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          donation_date: string
          donor_id: string | null
          hijri_date: string | null
          id: string
          notes: string | null
          org_id: string | null
          payment_method: string | null
          purpose: string | null
          receipt_number: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          donation_date?: string
          donor_id?: string | null
          hijri_date?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          payment_method?: string | null
          purpose?: string | null
          receipt_number?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          donation_date?: string
          donor_id?: string | null
          hijri_date?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          payment_method?: string | null
          purpose?: string | null
          receipt_number?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          city: string | null
          created_at: string
          donor_type: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          org_id: string | null
          phone: string | null
          status: string
          total_donations: number | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          donor_type?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          total_donations?: number | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          donor_type?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          total_donations?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donors_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          employee_number: string | null
          full_name: string
          hire_date: string | null
          id: string
          national_id: string | null
          org_id: string | null
          phone: string | null
          position: string | null
          salary: number | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          employee_number?: string | null
          full_name: string
          hire_date?: string | null
          id?: string
          national_id?: string | null
          org_id?: string | null
          phone?: string | null
          position?: string | null
          salary?: number | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          employee_number?: string | null
          full_name?: string
          hire_date?: string | null
          id?: string
          national_id?: string | null
          org_id?: string | null
          phone?: string | null
          position?: string | null
          salary?: number | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          balance: number | null
          code: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          org_id: string | null
          parent_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          balance?: number | null
          code: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          org_id?: string | null
          parent_id?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          balance?: number | null
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          org_id?: string | null
          parent_id?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_accounts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      grants: {
        Row: {
          amount: number
          conditions: string | null
          created_at: string
          description: string | null
          end_date: string | null
          grantor: string
          id: string
          org_id: string | null
          program_name: string
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          conditions?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          grantor: string
          id?: string
          org_id?: string | null
          program_name: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          conditions?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          grantor?: string
          id?: string
          org_id?: string | null
          program_name?: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "grants_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      guardians: {
        Row: {
          beneficiary_id: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          national_id_hash: string | null
          notes: string | null
          org_id: string | null
          phone: string | null
          relationship: string | null
          status: string
          updated_at: string
        }
        Insert: {
          beneficiary_id?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          relationship?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          beneficiary_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          relationship?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardians_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guardians_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      indicators: {
        Row: {
          actual_value: number | null
          created_at: string
          description: string | null
          id: string
          measurement_frequency: string | null
          name: string
          org_id: string | null
          owner_department: string | null
          parent_id: string | null
          plan_id: string | null
          status: string
          target_value: number | null
          type: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          actual_value?: number | null
          created_at?: string
          description?: string | null
          id?: string
          measurement_frequency?: string | null
          name: string
          org_id?: string | null
          owner_department?: string | null
          parent_id?: string | null
          plan_id?: string | null
          status?: string
          target_value?: number | null
          type?: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          actual_value?: number | null
          created_at?: string
          description?: string | null
          id?: string
          measurement_frequency?: string | null
          name?: string
          org_id?: string | null
          owner_department?: string | null
          parent_id?: string | null
          plan_id?: string | null
          status?: string
          target_value?: number | null
          type?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "indicators_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "indicators_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "indicators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "indicators_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "strategic_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          approved_by: string | null
          created_at: string
          created_by: string | null
          description: string | null
          entry_date: string
          entry_number: number
          hijri_date: string | null
          id: string
          org_id: string | null
          reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          entry_date?: string
          entry_number?: number
          hijri_date?: string | null
          id?: string
          org_id?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          entry_date?: string
          entry_number?: number
          hijri_date?: string | null
          id?: string
          org_id?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_lines: {
        Row: {
          account_id: string
          cost_center: string | null
          credit: number | null
          debit: number | null
          description: string | null
          id: string
          journal_entry_id: string
          sort_order: number | null
        }
        Insert: {
          account_id: string
          cost_center?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          journal_entry_id: string
          sort_order?: number | null
        }
        Update: {
          account_id?: string
          cost_center?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_lines_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      leaves: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          days_count: number | null
          employee_id: string
          end_date: string
          id: string
          leave_type: string
          notes: string | null
          org_id: string | null
          reason: string | null
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          days_count?: number | null
          employee_id: string
          end_date: string
          id?: string
          leave_type: string
          notes?: string | null
          org_id?: string | null
          reason?: string | null
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          days_count?: number | null
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: string
          notes?: string | null
          org_id?: string | null
          reason?: string | null
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaves_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaves_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      mail_messages: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_archived: boolean | null
          is_draft: boolean | null
          is_read: boolean | null
          is_starred: boolean | null
          org_id: string | null
          parent_id: string | null
          recipient_id: string | null
          recipient_name: string | null
          sender_id: string
          sender_name: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          is_draft?: boolean | null
          is_read?: boolean | null
          is_starred?: boolean | null
          org_id?: string | null
          parent_id?: string | null
          recipient_id?: string | null
          recipient_name?: string | null
          sender_id: string
          sender_name?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          is_draft?: boolean | null
          is_read?: boolean | null
          is_starred?: boolean | null
          org_id?: string | null
          parent_id?: string | null
          recipient_id?: string | null
          recipient_name?: string | null
          sender_id?: string
          sender_name?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mail_messages_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mail_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "mail_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_attendees: {
        Row: {
          attended: boolean | null
          attendee_name: string
          created_at: string
          id: string
          meeting_id: string
        }
        Insert: {
          attended?: boolean | null
          attendee_name: string
          created_at?: string
          id?: string
          meeting_id: string
        }
        Update: {
          attended?: boolean | null
          attendee_name?: string
          created_at?: string
          id?: string
          meeting_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          agenda: string | null
          attendees_count: number | null
          created_at: string
          created_by: string | null
          hijri_date: string | null
          id: string
          location: string | null
          meeting_date: string
          meeting_type: string
          minutes: string | null
          org_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          agenda?: string | null
          attendees_count?: number | null
          created_at?: string
          created_by?: string | null
          hijri_date?: string | null
          id?: string
          location?: string | null
          meeting_date: string
          meeting_type?: string
          minutes?: string | null
          org_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          agenda?: string | null
          attendees_count?: number | null
          created_at?: string
          created_by?: string | null
          hijri_date?: string | null
          id?: string
          location?: string | null
          meeting_date?: string
          meeting_type?: string
          minutes?: string | null
          org_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          key: string
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          key: string
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          key?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_id?: string | null
          related_type?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          city: string | null
          created_at: string
          id: string
          name: string
          registration_no: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          name: string
          registration_no?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          name?: string
          registration_no?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: string
          id: string
          module_id: string
        }
        Insert: {
          action: string
          id?: string
          module_id: string
        }
        Update: {
          action?: string
          id?: string
          module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_pinned: boolean
          priority: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean
          priority?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean
          priority?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          full_name: string
          id: string
          is_protected: boolean
          job_title: string | null
          last_login_at: string | null
          must_change_password: boolean
          org_id: string | null
          phone: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_protected?: boolean
          job_title?: string | null
          last_login_at?: string | null
          must_change_password?: boolean
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_protected?: boolean
          job_title?: string | null
          last_login_at?: string | null
          must_change_password?: boolean
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          category: string | null
          completion_percentage: number | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          manager_id: string | null
          manager_name: string | null
          name: string
          org_id: string | null
          spent_amount: number | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          category?: string | null
          completion_percentage?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          manager_id?: string | null
          manager_name?: string | null
          name: string
          org_id?: string | null
          spent_amount?: number | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          category?: string | null
          completion_percentage?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          manager_id?: string | null
          manager_name?: string | null
          name?: string
          org_id?: string | null
          spent_amount?: number | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      report_definitions: {
        Row: {
          created_at: string
          description: string | null
          filters_schema: Json | null
          id: string
          key: string
          module_key: string | null
          name: string
          org_id: string | null
          output_format_default: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          filters_schema?: Json | null
          id?: string
          key: string
          module_key?: string | null
          name: string
          org_id?: string | null
          output_format_default?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          filters_schema?: Json | null
          id?: string
          key?: string
          module_key?: string | null
          name?: string
          org_id?: string | null
          output_format_default?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_definitions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      report_runs: {
        Row: {
          created_at: string
          filters_used: Json | null
          finished_at: string | null
          id: string
          output_format: string
          report_definition_id: string | null
          requested_by: string | null
          started_at: string | null
          status: string
          storage_path: string | null
        }
        Insert: {
          created_at?: string
          filters_used?: Json | null
          finished_at?: string | null
          id?: string
          output_format?: string
          report_definition_id?: string | null
          requested_by?: string | null
          started_at?: string | null
          status?: string
          storage_path?: string | null
        }
        Update: {
          created_at?: string
          filters_used?: Json | null
          finished_at?: string | null
          id?: string
          output_format?: string
          report_definition_id?: string | null
          requested_by?: string | null
          started_at?: string | null
          status?: string
          storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_runs_report_definition_id_fkey"
            columns: ["report_definition_id"]
            isOneToOne: false
            referencedRelation: "report_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          assigned_to: string | null
          attachments: Json | null
          created_at: string
          description: string | null
          hijri_date: string | null
          id: string
          notes: string | null
          org_id: string | null
          priority: string
          request_type: string
          status: string
          submitter_id: string | null
          submitter_name: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          attachments?: Json | null
          created_at?: string
          description?: string | null
          hijri_date?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          priority?: string
          request_type: string
          status?: string
          submitter_id?: string | null
          submitter_name?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          attachments?: Json | null
          created_at?: string
          description?: string | null
          hijri_date?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          priority?: string
          request_type?: string
          status?: string
          submitter_id?: string | null
          submitter_name?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          granted_at: string
          id: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          granted_at?: string
          id?: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          granted_at?: string
          id?: string
          permission_id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      shareholders: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          join_date: string | null
          national_id_hash: string | null
          notes: string | null
          org_id: string | null
          phone: string | null
          share_value: number | null
          shares_count: number | null
          status: string
          total_value: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          join_date?: string | null
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          share_value?: number | null
          shares_count?: number | null
          status?: string
          total_value?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          join_date?: string | null
          national_id_hash?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          share_value?: number | null
          shares_count?: number | null
          status?: string
          total_value?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shareholders_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsorships: {
        Row: {
          beneficiary_id: string
          created_at: string
          end_date: string | null
          id: string
          monthly_amount: number
          org_id: string | null
          program_name: string
          sponsor_name: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          beneficiary_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          monthly_amount?: number
          org_id?: string | null
          program_name: string
          sponsor_name?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          beneficiary_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          monthly_amount?: number
          org_id?: string | null
          program_name?: string
          sponsor_name?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsorships_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsorships_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      strategic_plans: {
        Row: {
          created_at: string
          description: string | null
          end_year: number
          id: string
          mission: string | null
          name: string
          org_id: string | null
          start_year: number
          status: string
          updated_at: string
          vision: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_year: number
          id?: string
          mission?: string | null
          name: string
          org_id?: string | null
          start_year: number
          status?: string
          updated_at?: string
          vision?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_year?: number
          id?: string
          mission?: string | null
          name?: string
          org_id?: string | null
          start_year?: number
          status?: string
          updated_at?: string
          vision?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategic_plans_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          category: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          org_id: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          category?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          category?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          assigned_to_name: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          department: string | null
          description: string | null
          due_date: string | null
          id: string
          org_id: string | null
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          org_id?: string | null
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          org_id?: string | null
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          attachments: Json | null
          created_at: string
          description: string | null
          from_department: string | null
          id: string
          notes: string | null
          org_id: string | null
          priority: string
          sender_id: string | null
          sender_name: string | null
          status: string
          title: string
          to_department: string | null
          transaction_number: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          description?: string | null
          from_department?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          priority?: string
          sender_id?: string | null
          sender_name?: string | null
          status?: string
          title: string
          to_department?: string | null
          transaction_number?: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          description?: string | null
          from_department?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          priority?: string
          sender_id?: string | null
          sender_name?: string | null
          status?: string
          title?: string
          to_department?: string | null
          transaction_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          city: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          join_date: string | null
          notes: string | null
          org_id: string | null
          phone: string | null
          skills: string | null
          status: string
          updated_at: string
          volunteer_hours: number | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          join_date?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          skills?: string | null
          status?: string
          updated_at?: string
          volunteer_hours?: number | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          join_date?: string | null
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          skills?: string | null
          status?: string
          updated_at?: string
          volunteer_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ensure_employee_for_current_user: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "system_admin" | "admin" | "supervisor" | "user" | "auditor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["system_admin", "admin", "supervisor", "user", "auditor"],
    },
  },
} as const
